import {Feature} from '@copor/core/domain/FeatureList/enum/Feature';
import {FeatureDefinitionDTO} from '@copor/core/domain/FeatureList/FeatureDefinitionDTO';
import {coreFeatureDefinitions} from '@copor/core/domain/FeatureList/CoreFeatureDefinitions';
import {getPermissionDefinitions, isRegisteredPermission} from '@copor/core/domain/Core/Permission/PermissionRegistry';

// Every feature the app knows about: core's, plus those of each module the app
// includes (registered at startup from client/src/modules.ts). Core code reads
// features, menu and dashboard entries from here instead of from a module.
const definitions: FeatureDefinitionDTO[] = [];
const keys = new Set<Feature>();

export function registerFeatureDefinitions(moduleName: string, moduleDefinitions: FeatureDefinitionDTO[]): void {
	for (const definition of moduleDefinitions) {
		if (keys.has(definition.key)) {
			throw new Error(`Feature "${definition.key}" (module "${moduleName}") is registered more than once.`);
		}
	}

	for (const definition of moduleDefinitions) {
		keys.add(definition.key);
		definitions.push(definition);
	}
}

// Throws if a feature's view permission isn't registered, or a registered
// permission is grouped under a feature that isn't. Call once all modules are in.
export function validateFeatureReferences(): void {
	const broken = [
		... definitions
			.filter((definition) => definition.viewPermission && !isRegisteredPermission(definition.viewPermission))
			.map((definition) => `feature ${definition.key} -> view permission ${definition.viewPermission}`),
		... getPermissionDefinitions()
			.filter((definition) => !keys.has(definition.feature))
			.map((definition) => `permission ${definition.key} -> feature ${definition.feature}`)
	];

	if (broken.length > 0) {
		throw new Error(`Unregistered features or permissions referenced:\n${broken.join('\n')}`);
	}
}

export function getFeatureDefinitions(): readonly FeatureDefinitionDTO[] {
	return definitions;
}

registerFeatureDefinitions('core', coreFeatureDefinitions);
