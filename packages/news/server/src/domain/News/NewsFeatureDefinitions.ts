import {FeatureDefinitionDTO} from '@copor/core/domain/FeatureList/FeatureDefinitionDTO';
import {NewsFeature} from '@copor/news/domain/News/NewsFeature';
import {NewsPermission} from '@copor/news/domain/News/NewsPermission';

export const newsFeatureDefinitions: FeatureDefinitionDTO[] = [
	{
		key: NewsFeature.NEWS,
		viewPermission: NewsPermission.canViewNewsFeature
	}
];
