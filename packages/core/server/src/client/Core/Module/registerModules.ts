import {CoporModule} from '@copor/core/client/Core/Module/CoporModule';
import {validateModules} from '@copor/core/client/Core/Module/validateModules';
import {setRegisteredModules} from '@copor/core/client/Core/Module/ModuleRegistry';
import {
	registerPermissionDefinitions,
	validatePermissionDependencies
} from '@copor/core/domain/Core/Permission/PermissionRegistry';
import {registerFeatureDefinitions, validateFeatureReferences} from '@copor/core/domain/FeatureList/FeatureRegistry';
import {subscribeToModuleEvents} from '@copor/core/client/Core/Module/ModuleEvents';
import {registerModuleFilterLists} from '@copor/core/client/Core/Module/ModuleFilterLists';
import {registerModuleClientConfig} from '@copor/core/client/Core/Module/ModuleClientConfig';
import {registerModulePreferences} from '@copor/core/domain/User/UserPreferences/ModulePreferences/ModulePreferenceRegistry';

// Called once at startup, before the router is built.
export function registerModules(modules: CoporModule[]): void {
	validateModules(modules);
	setRegisteredModules(modules);

	for (const module of modules) {
		registerPermissionDefinitions(module.name, module.permissions ?? []);
		registerFeatureDefinitions(module.name, module.features ?? []);
		subscribeToModuleEvents(module.eventSubscribers ?? {});
		registerModuleFilterLists(module.name, module.filterLists ?? {});
		registerModulePreferences(module.name, module.preferences ?? []);
		registerModuleClientConfig(module.name, module.clientConfig);
	}

	validatePermissionDependencies();
	validateFeatureReferences();
}
