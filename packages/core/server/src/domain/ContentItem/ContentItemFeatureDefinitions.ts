import {FeatureDefinitionDTO} from '@copor/core/domain/FeatureList/FeatureDefinitionDTO';
import {ContentItemFeature} from '@copor/core/domain/ContentItem/ContentItemFeature';
import {DashboardCategory} from '@copor/core/domain/FeatureList/enum/DashboardCategory';
import {ContentItemPermission} from '@copor/core/domain/ContentItem/ContentItemPermission';

export const contentItemFeatureDefinitions: FeatureDefinitionDTO[] = [
	{
		key: ContentItemFeature.ADMINISTRATION_CONTENT_ITEM,
		viewPermission: ContentItemPermission.canViewAdministrationContentItemFeature,
		dashboardItem: {category: DashboardCategory.ADMINISTRATION, icon: 'book', titleKey: 'CONTENT_ITEM', order: 20}
	}
];
