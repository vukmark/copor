import {getPermissionDefinitions, validatePermissionDependencies} from '@copor/core/domain/Core/Permission/PermissionRegistry';
import {allModuleSets} from '../../helpers/allModuleDefinitions';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {
	getDirectDependencies,
	getDirectDependents,
	getTransitiveDependencies,
	getTransitiveDependents
} from '@copor/core/domain/Core/Permission/PermissionDependencyGraph';

describe('PermissionDependencyGraph', () => {
	const permissionDefinition = getPermissionDefinitions();

	it('every dependsOn entry references a registered permission', () => {
		expect(() => validatePermissionDependencies()).not.toThrow();
	});

	it.each(allModuleSets)('every $moduleName permission has a definition in its own module', (set) => {
		const definedKeys = new Set(set.definitions.map((definition) => definition.key));

		for (const permissionType of Object.values(set.permissions))
			expect(definedKeys.has(permissionType as PermissionType)).toBe(true);
	});

	it.each(allModuleSets)('$moduleName permission keys start with "$moduleName."', (set) => {
		for (const permissionType of Object.values(set.permissions))
			expect(permissionType.startsWith(set.moduleName + '.')).toBe(true);
	});

	it('contains no cycles', () => {
		const visiting = new Set<PermissionType>();
		const visited = new Set<PermissionType>();

		function visit(permissionType: PermissionType, path: PermissionType[]): void {
			if (visited.has(permissionType))
				return;

			if (visiting.has(permissionType))
				throw new Error(`Cycle detected: ${[... path, permissionType].join(' -> ')}`);

			visiting.add(permissionType);
			for (const dependency of getDirectDependencies(permissionType))
				visit(dependency, [... path, permissionType]);
			visiting.delete(permissionType);
			visited.add(permissionType);
		}

		for (const definition of permissionDefinition)
			visit(definition.key, []);
	});

	it('getTransitiveDependents is the inverse of getTransitiveDependencies', () => {
		for (const definition of permissionDefinition) {
			for (const dependency of getTransitiveDependencies(definition.key))
				expect(getTransitiveDependents(dependency)).toContain(definition.key);
		}
	});

	it('getDirectDependents returns only immediate dependents', () => {
		for (const definition of permissionDefinition) {
			for (const dependency of definition.dependsOn ?? [])
				expect(getDirectDependents(dependency)).toContain(definition.key);
		}
	});
});
