import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface SaveStateDTO {
	id: string;
	name: string;
	code: string;
	countryId: string;
	actorId: string;
	publishStatus: PublishStatus;
}
