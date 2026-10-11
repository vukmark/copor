import {PermissionDefinitionDTO} from '@copor/core/domain/Core/Permission/PermissionDefinitionDTO';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';

export interface PermissionDependencyRow {
	permission_code: PermissionType;
	depends_on_code: PermissionType;
}

// Shared by the resync migrations and the drift test that checks the latest
// migration's output still matches the registered permission definitions' dependsOn data.
export function flattenPermissionDependencyGraph(graph: readonly PermissionDefinitionDTO[]): PermissionDependencyRow[] {
	const rows: PermissionDependencyRow[] = [];

	for (const definition of graph) {
		for (const dependency of definition.dependsOn ?? [])
			rows.push({permission_code: definition.key, depends_on_code: dependency});
	}

	return rows;
}
