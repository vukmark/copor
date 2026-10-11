import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';
import {getAllPermissionTypes} from '@copor/core/domain/Core/Permission/PermissionRegistry';
import {validatePermissionDependencyChange} from '@copor/core/domain/Core/Permission/validatePermissionDependencyChange';

// Real dependency chain from CorePermissionDefinitions.ts:
// canViewAdministrationUserFeature (A) <- canGetUserList (B) <- canGetUserPermissionList (C) <- canDeleteUserPermissions (D)
const A = CorePermission.canViewAdministrationUserFeature;
const B = CorePermission.canGetUserList;
const C = CorePermission.canGetUserPermissionList;
const D = CorePermission.canDeleteUserPermissions;

describe('validatePermissionDependencyChange', () => {
	it('reports no issues when the desired set is already dependency-consistent', () => {
		const result = validatePermissionDependencyChange(new Set([A]), new Set([A]));

		expect(result.valid).toBe(true);
		expect(result.issues).toEqual([]);
		expect(new Set(result.suggestedResolution)).toEqual(new Set([A]));
	});

	it('flags a single missing direct dependency', () => {
		const result = validatePermissionDependencyChange(new Set(), new Set([B]));

		expect(result.valid).toBe(false);
		expect(result.issues).toEqual([
			{type: 'missing_dependency', permission: B, missing: [A]}
		]);
		expect(new Set(result.suggestedResolution)).toEqual(new Set([A, B]));
	});

	it('flags a missing transitive dependency chain', () => {
		const result = validatePermissionDependencyChange(new Set(), new Set([D]));

		expect(result.valid).toBe(false);
		expect(result.issues).toEqual([
			{
				type: 'missing_dependency',
				permission: D,
				missing: expect.arrayContaining([A, B, C])
			}
		]);
		expect(result.issues[0]).toMatchObject({missing: expect.arrayContaining([A, B, C])});
		expect((result.issues[0] as {missing: PermissionType[]}).missing).toHaveLength(3);
		expect(new Set(result.suggestedResolution)).toEqual(new Set([A, B, C, D]));
	});

	it('flags an orphaned dependent when disabling a permission a still-enabled permission needs', () => {
		// B is being disabled while C (which depends on it) stays enabled. This necessarily
		// also shows up as a missing_dependency on C itself — both are true statements about
		// the same underlying inconsistency, from opposite directions.
		const result = validatePermissionDependencyChange(new Set([A, B, C]), new Set([A, C]));

		expect(result.valid).toBe(false);
		expect(result.issues).toEqual(expect.arrayContaining([
			{type: 'orphaned_dependent', permission: B, stillEnabledDependents: [C]},
			{type: 'missing_dependency', permission: C, missing: [B]}
		]));
		expect(result.issues).toHaveLength(2);
	});

	it('resolves a combined missing-dependency and orphaned-dependent conflict to a stable fixed point', () => {
		// Current: A and B enabled. Desired: drop A but keep B, and add D (which transitively
		// needs C and A). This contends on A from both directions in the same request; the
		// resolver iterates the fix until no permission is both missing and orphaned.
		const result = validatePermissionDependencyChange(new Set([A, B]), new Set([B, D]));

		expect(result.valid).toBe(false);
		expect(new Set(result.suggestedResolution)).toEqual(new Set([A, B]));
	});

	it('resolves the transitive-missing-dependency case within performance budget on the full real graph', () => {
		const allPermissionTypes = getAllPermissionTypes();
		const desired = new Set(allPermissionTypes);
		const current = new Set(allPermissionTypes.slice(0, Math.floor(allPermissionTypes.length / 2)));

		const start = performance.now();
		const result = validatePermissionDependencyChange(current, desired);
		const elapsedMs = performance.now() - start;

		expect(result).toBeDefined();
		expect(elapsedMs).toBeLessThan(50);
	});
});
