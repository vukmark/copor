import {Feature} from '@copor/core/domain/FeatureList/enum/Feature';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {DashboardCategory} from '@copor/core/domain/FeatureList/enum/DashboardCategory';

export interface FeatureDefinitionDTO {
	key: Feature;
	// A user who has this permission ALLOWed gets the feature in their feature
	// list. Without one the feature is never unlocked.
	viewPermission?: PermissionType;
	// Entry in the side menu (sorted by `order`), linking to `key`.
	menuItem?: {icon: string, labelKey: string, order: number};
	// Entry on the administration dashboard (sorted by `order` within its
	// category), linking to `key`.
	dashboardItem?: {category: DashboardCategory, icon: string, titleKey: string, order: number};
}
