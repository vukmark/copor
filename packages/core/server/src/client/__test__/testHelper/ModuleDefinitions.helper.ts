import {CoporModule} from '../../Core/Module/CoporModule';

// A module's permission and feature enums against the definitions its
// descriptor registers: every enum value has a definition, and every
// permission key carries the module's prefix. Each package runs it for its own
// module, so the check doesn't depend on which modules an app includes.
export function testModuleDefinitions(
	module: Pick<CoporModule, 'name' | 'permissions' | 'features'>,
	permissions: Record<string, string>,
	features: Record<string, string> = {}
): void {
	describe(`${module.name} module definitions`, () => {
		it('defines every permission of its enum', () => {
			const definedKeys = new Set<string>((module.permissions ?? []).map((definition) => definition.key));

			expect(Object.values(permissions).filter((key) => !definedKeys.has(key))).toEqual([]);
		});

		it(`prefixes every permission key with "${module.name}."`, () => {
			const keys = [... Object.values(permissions), ... (module.permissions ?? []).map((definition) => definition.key)];

			expect(keys.filter((key) => !key.startsWith(`${module.name}.`))).toEqual([]);
		});

		it('defines every feature of its enum', () => {
			const definedKeys = new Set<string>((module.features ?? []).map((definition) => definition.key));

			expect(Object.values(features).filter((key) => !definedKeys.has(key))).toEqual([]);
		});
	});
}
