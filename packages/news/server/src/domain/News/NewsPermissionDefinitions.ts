import {PermissionDefinitionDTO} from '@copor/core/domain/Core/Permission/PermissionDefinitionDTO';
import {NewsFeature} from '@copor/news/domain/News/NewsFeature';
import {NewsPermission} from '@copor/news/domain/News/NewsPermission';

export const newsPermissionDefinitions: PermissionDefinitionDTO[] = [
	{
		key: NewsPermission.canCreateNews,
		feature: NewsFeature.NEWS,
		requiresScope: true,
		dependsOn: [NewsPermission.canGetNewsList]
	},
	{
		key: NewsPermission.canDeleteNews,
		feature: NewsFeature.NEWS,
		dependsOn: [NewsPermission.canGetNewsList, NewsPermission.canGetNews]
	},
	{
		key: NewsPermission.canUpdateNews,
		feature: NewsFeature.NEWS,
		dependsOn: [NewsPermission.canGetNewsList, NewsPermission.canGetNews]
	},
	{
		key: NewsPermission.canGetNews,
		feature: NewsFeature.NEWS,
		dependsOn: [NewsPermission.canGetNewsList]
	},
	{
		key: NewsPermission.canGetNewsList,
		feature: NewsFeature.NEWS,
		dependsOn: [NewsPermission.canViewNewsFeature]
	},
	{
		key: NewsPermission.canViewNewsFeature,
		feature: NewsFeature.NEWS
	}
];
