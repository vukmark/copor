import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {getPermissionDefinitions, getPermissionRegistryVersion} from '@copor/core/domain/Core/Permission/PermissionRegistry';

interface DependencyGraph {
	version: number;
	dependsOn: Map<PermissionType, PermissionType[]>;
	dependents: Map<PermissionType, PermissionType[]>;
}

let graph: DependencyGraph | undefined;

// Built on first use and rebuilt when a module registers more permissions.
function getGraph(): DependencyGraph {
	if (graph && graph.version === getPermissionRegistryVersion())
		return graph;

	const definitions = getPermissionDefinitions();
	const dependsOn = new Map<PermissionType, PermissionType[]>(
		definitions.map((definition) => [definition.key, definition.dependsOn ?? []])
	);
	const dependents = new Map<PermissionType, PermissionType[]>();

	for (const definition of definitions) {
		for (const dependency of definition.dependsOn ?? []) {
			const list = dependents.get(dependency) ?? [];

			list.push(definition.key);
			dependents.set(dependency, list);
		}
	}

	graph = {version: getPermissionRegistryVersion(), dependsOn, dependents};

	return graph;
}

export function getDirectDependencies(permissionType: PermissionType): PermissionType[] {
	return getGraph().dependsOn.get(permissionType) ?? [];
}

export function getTransitiveDependencies(permissionType: PermissionType): PermissionType[] {
	return traverse(permissionType, getDirectDependencies);
}

export function getDirectDependents(permissionType: PermissionType): PermissionType[] {
	return getGraph().dependents.get(permissionType) ?? [];
}

export function getTransitiveDependents(permissionType: PermissionType): PermissionType[] {
	return traverse(permissionType, getDirectDependents);
}

function traverse(
	permissionType: PermissionType,
	getNeighbors: (permissionType: PermissionType) => PermissionType[]
): PermissionType[] {
	const visited = new Set<PermissionType>();
	const queue = [... getNeighbors(permissionType)];

	while (queue.length > 0) {
		const current = queue.shift() as PermissionType;

		if (visited.has(current))
			continue;

		visited.add(current);
		queue.push(... getNeighbors(current));
	}

	return [... visited];
}
