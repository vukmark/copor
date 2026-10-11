import {evaluateMissingPermissionDependencies} from '@copor/core/domain/Core/Permission/evaluateMissingPermissionDependencies';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';
import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';
import {PermissionScope} from '@copor/core/domain/Core/enum/PermissionScope';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';

function allow(permissionType: PermissionType): ScopedPermission {
	return {permissionType, scope: PermissionScope.ALL, effect: PermissionEffect.ALLOW};
}

describe('evaluateMissingPermissionDependencies', () => {
	it('returns no warnings for a permission with no dependencies', () => {
		const warnings = evaluateMissingPermissionDependencies([
			allow(CorePermission.canViewAdministrationUserFeature)
		]);

		expect(warnings).toEqual([]);
	});

	it('returns no warnings when the full dependency chain is allowed', () => {
		const warnings = evaluateMissingPermissionDependencies([
			allow(CorePermission.canViewAdministrationUserFeature),
			allow(CorePermission.canGetUserList),
			allow(CorePermission.canGetUserPermissionList),
			allow(CorePermission.canDeleteUserPermissions)
		]);

		expect(warnings).toEqual([]);
	});

	it('flags a missing direct dependency', () => {
		const warnings = evaluateMissingPermissionDependencies([
			allow(CorePermission.canGetUserList),
			allow(CorePermission.canGetUserPermissionList)
		]);

		expect(warnings).toEqual([
			{
				permissionType: CorePermission.canGetUserList,
				missingDependencies: [CorePermission.canViewAdministrationUserFeature]
			},
			{
				permissionType: CorePermission.canGetUserPermissionList,
				missingDependencies: [CorePermission.canViewAdministrationUserFeature]
			}
		]);
	});

	it('flags a missing transitive dependency', () => {
		const warnings = evaluateMissingPermissionDependencies([
			allow(CorePermission.canDeleteUserPermissions)
		]);

		expect(warnings).toEqual([
			{
				permissionType: CorePermission.canDeleteUserPermissions,
				missingDependencies: expect.arrayContaining([
					CorePermission.canGetUserPermissionList,
					CorePermission.canGetUserList,
					CorePermission.canViewAdministrationUserFeature
				])
			}
		]);
	});

	it('ignores permissions that are not ALLOW', () => {
		const warnings = evaluateMissingPermissionDependencies([
			{permissionType: CorePermission.canDeleteUserPermissions, scope: PermissionScope.ALL, effect: PermissionEffect.DENY}
		]);

		expect(warnings).toEqual([]);
	});

	it('does not depend on list order', () => {
		const inOrder = evaluateMissingPermissionDependencies([
			allow(CorePermission.canGetUserPermissionList),
			allow(CorePermission.canDeleteUserPermissions)
		]);
		const reversed = evaluateMissingPermissionDependencies([
			allow(CorePermission.canDeleteUserPermissions),
			allow(CorePermission.canGetUserPermissionList)
		]);

		expect(new Set(inOrder.map((w) => w.permissionType)))
			.toEqual(new Set(reversed.map((w) => w.permissionType)));
	});
});
