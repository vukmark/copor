import {FeatureDefinitionDTO} from '@copor/core/domain/FeatureList/FeatureDefinitionDTO';
import {CloudFeature} from '@copor/cloud/domain/Cloud/CloudFeature';
import {CloudPermission} from '@copor/cloud/domain/Cloud/CloudPermission';

export const cloudFeatureDefinitions: FeatureDefinitionDTO[] = [
	{
		key: CloudFeature.CLOUD,
		viewPermission: CloudPermission.canViewCloudFeature
	}
];
