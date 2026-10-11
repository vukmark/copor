import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface GetStateDTO {
	id: string;
	name: string;
	code: string;
	countryId: string;
	publishStatus: PublishStatus;
}
