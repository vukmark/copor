import {PermissionDefinitionDTO} from '@copor/core/domain/Core/Permission/PermissionDefinitionDTO';
import {ContentItemFeature} from '@copor/core/domain/ContentItem/ContentItemFeature';
import {ContentItemPermission} from '@copor/core/domain/ContentItem/ContentItemPermission';

export const contentItemPermissionDefinitions: PermissionDefinitionDTO[] = [
	{
		key: ContentItemPermission.canCreateContentItem,
		feature: ContentItemFeature.ADMINISTRATION_CONTENT_ITEM,
		dependsOn: [ContentItemPermission.canGetContentItemList]
	},
	{
		key: ContentItemPermission.canDeleteContentItem,
		feature: ContentItemFeature.ADMINISTRATION_CONTENT_ITEM,
		dependsOn: [ContentItemPermission.canGetContentItemList, ContentItemPermission.canGetContentItem]
	},
	{
		key: ContentItemPermission.canUpdateContentItem,
		feature: ContentItemFeature.ADMINISTRATION_CONTENT_ITEM,
		dependsOn: [ContentItemPermission.canGetContentItemList, ContentItemPermission.canGetContentItem]
	},
	{
		key: ContentItemPermission.canGetContentItem,
		feature: ContentItemFeature.ADMINISTRATION_CONTENT_ITEM,
		dependsOn: [ContentItemPermission.canGetContentItemList]
	},
	{
		key: ContentItemPermission.canGetContentItemList,
		feature: ContentItemFeature.ADMINISTRATION_CONTENT_ITEM,
		dependsOn: [ContentItemPermission.canViewAdministrationContentItemFeature]
	},
	{
		key: ContentItemPermission.canViewAdministrationContentItemFeature,
		feature: ContentItemFeature.ADMINISTRATION_CONTENT_ITEM
	}
];
