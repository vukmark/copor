import {Feature} from '@copor/core/domain/FeatureList/enum/Feature';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';

export interface FeatureDTO {
	feature: Feature;
	name: string;
}
export interface ScopedPermissionWithTranslation extends ScopedPermission {
	translation: string;
	// Detailed explanation of what the permission does and where it's used,
	// shown behind an info button next to the permission name. Empty string
	// when no copy has been authored yet for this permission.
	description: string;
	requiresScope: boolean;
	// Transitive closure of permissions that must also be ALLOW for this one to work.
	dependsOn: PermissionType[];
}

export interface FeatureScopedPermissionViewModel {
	feature: FeatureDTO;
	permissionList: ScopedPermissionWithTranslation[]
}