import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {PermissionDefinitionDTO} from '@copor/core/domain/Core/Permission/PermissionDefinitionDTO';
import {corePermissionDefinitions} from '@copor/core/domain/Core/Permission/CorePermissionDefinitions';

// Every permission the app knows about: core's, plus those of each module the
// app includes (registered at startup from client/src/modules.ts). Core code
// reads permissions from here instead of from any module's enum.
const definitions: PermissionDefinitionDTO[] = [];
const keys = new Set<PermissionType>();
let version = 0;

export function registerPermissionDefinitions(moduleName: string, moduleDefinitions: PermissionDefinitionDTO[]): void {
	for (const definition of moduleDefinitions) {
		if (!definition.key.startsWith(moduleName + '.')) {
			throw new Error(`Permission "${definition.key}" must start with "${moduleName}." to be registered by module "${moduleName}".`);
		}
		if (keys.has(definition.key)) {
			throw new Error(`Permission "${definition.key}" is registered more than once.`);
		}
	}

	for (const definition of moduleDefinitions) {
		keys.add(definition.key);
		definitions.push(definition);
	}
	version++;
}

// Throws if a permission depends on one that isn't registered, e.g. a module
// depending on a module the app doesn't include. Call once all modules are in.
export function validatePermissionDependencies(): void {
	const broken = definitions.flatMap((definition) => (definition.dependsOn ?? [])
		.filter((dependency) => !keys.has(dependency))
		.map((dependency) => `${definition.key} -> ${dependency}`));

	if (broken.length > 0) {
		throw new Error(`Permissions depend on unregistered permissions:\n${broken.join('\n')}`);
	}
}

export function getPermissionDefinitions(): readonly PermissionDefinitionDTO[] {
	return definitions;
}

export function getAllPermissionTypes(): PermissionType[] {
	return definitions.map((definition) => definition.key);
}

export function isRegisteredPermission(permissionType: string): permissionType is PermissionType {
	return keys.has(permissionType as PermissionType);
}

// Increases on every registration, so callers can rebuild caches derived from
// the definitions.
export function getPermissionRegistryVersion(): number {
	return version;
}

registerPermissionDefinitions('core', corePermissionDefinitions);
