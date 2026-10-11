import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface SaveCountryDTO {
	id: string;
	name: string;
	code: string;
	actorId: string;
	publishStatus: PublishStatus;
}
