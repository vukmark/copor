import {ModulePreferenceDefinitionDTO} from '@copor/core/domain/User/UserPreferences/ModulePreferences/ModulePreferenceDefinitionDTO';

// The module preferences of the modules the app includes (registered at
// startup from each descriptor's `preferences`). Core has none of its own.
const definitions = new Map<string, ModulePreferenceDefinitionDTO>();

export function registerModulePreferences(moduleName: string, moduleDefinitions: ModulePreferenceDefinitionDTO[]): void {
	for (const definition of moduleDefinitions) {
		if (!definition.key.startsWith(moduleName + '.')) {
			throw new Error(`Preference "${definition.key}" must start with "${moduleName}." to be registered by module "${moduleName}".`);
		}
		if (definitions.has(definition.key)) {
			throw new Error(`Preference "${definition.key}" is registered more than once.`);
		}
	}

	for (const definition of moduleDefinitions)
		definitions.set(definition.key, definition);
}

export function getModulePreferenceDefinitions(): readonly ModulePreferenceDefinitionDTO[] {
	return [... definitions.values()];
}

export function findModulePreferenceDefinition(key: string): ModulePreferenceDefinitionDTO | undefined {
	return definitions.get(key);
}

// Every registered preference with the user's stored value, or its default.
export function resolveModulePreferences(stored: Record<string, boolean>): Record<string, boolean> {
	return Object.fromEntries(getModulePreferenceDefinitions()
		.map((definition) => [definition.key, stored[definition.key] ?? definition.default]));
}

// For tests.
export function clearModulePreferences(): void {
	definitions.clear();
}
