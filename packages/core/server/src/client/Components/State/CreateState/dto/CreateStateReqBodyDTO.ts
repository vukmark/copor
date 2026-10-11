import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface CreateStateReqBodyDTO {
	name: string;
	code: string;
	countryId: string;
	publishStatus: PublishStatus;
}