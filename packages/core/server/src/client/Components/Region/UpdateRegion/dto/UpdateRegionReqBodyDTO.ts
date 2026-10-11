import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface UpdateRegionReqBodyDTO {
	id: string;
	country: string;
	state: string;
	postalCode: string;
	city: string;
	community: string;
	communityCode: string;
	latitude: number;
	longitude: number;
	publishStatus: PublishStatus;
}
