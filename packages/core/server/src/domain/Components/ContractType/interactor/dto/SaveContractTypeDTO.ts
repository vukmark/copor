import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface SaveContractTypeDTO {
	id: string;
	name: string;
	file: string;
	description?: string;
	publishStatus: PublishStatus;
	actorId: string;
}
