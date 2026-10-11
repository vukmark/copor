import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {Feature} from '@copor/core/domain/FeatureList/enum/Feature';

export interface PermissionDefinitionDTO {
	key: PermissionType;
	feature: Feature;
	requiresScope?: boolean;
	// Permissions that must also be ALLOW for this permission to actually work end-to-end
	// (e.g. viewing a single tenant requires being able to list tenants).
	// See PermissionDependencyGraph.ts for how this is resolved.
	dependsOn?: PermissionType[];
}
