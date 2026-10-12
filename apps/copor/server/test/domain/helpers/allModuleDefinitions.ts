import {getFeatureDefinitions, registerFeatureDefinitions} from '@copor/core/domain/FeatureList/FeatureRegistry';
import {getAllPermissionTypes, registerPermissionDefinitions} from '@copor/core/domain/Core/Permission/PermissionRegistry';
import {
	findModulePreferenceDefinition,
	registerModulePreferences
} from '@copor/core/domain/User/UserPreferences/ModulePreferences/ModulePreferenceRegistry';
import {allModules} from '../../../src/modules';

// Registers the permissions, features and preferences of every module this app
// includes (src/modules.ts), as registerModules does at startup. Safe to call
// again: what is already registered is skipped. Each package checks its own
// definitions against its enums (testModuleDefinitions).
export function registerAllModuleDefinitions(): void {
	const permissionKeys = new Set<string>(getAllPermissionTypes());
	const featureKeys = new Set<string>(getFeatureDefinitions().map((definition) => definition.key));

	for (const module of allModules) {
		const permissions = module.permissions ?? [];
		const features = module.features ?? [];

		if (!permissions.some((definition) => permissionKeys.has(definition.key)))
			registerPermissionDefinitions(module.name, permissions);
		if (!features.some((definition) => featureKeys.has(definition.key)))
			registerFeatureDefinitions(module.name, features);

		const preferences = module.preferences ?? [];

		if (preferences.length > 0 && !findModulePreferenceDefinition(preferences[0].key))
			registerModulePreferences(module.name, preferences);
	}
}
