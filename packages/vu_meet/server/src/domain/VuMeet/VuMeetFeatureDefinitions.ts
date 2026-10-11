import {FeatureDefinitionDTO} from '@copor/core/domain/FeatureList/FeatureDefinitionDTO';
import {VuMeetFeature} from '@copor/vu_meet/domain/VuMeet/VuMeetFeature';
import {VuMeetPermission} from '@copor/vu_meet/domain/VuMeet/VuMeetPermission';

export const vuMeetFeatureDefinitions: FeatureDefinitionDTO[] = [
	{
		key: VuMeetFeature.VU_MEET,
		viewPermission: VuMeetPermission.canViewVuMeetFeature
	}
];
