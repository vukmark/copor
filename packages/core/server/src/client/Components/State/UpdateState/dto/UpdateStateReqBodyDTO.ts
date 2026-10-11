import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface UpdateStateReqBodyDTO {
	id: string;
	name: string;
	code: string;
	countryId: string;
	publishStatus: PublishStatus;
}
