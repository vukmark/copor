import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface CreateContractTypeReqBodyDTO {
	name: string;
	file: string;
	description?: string;
	publishStatus: PublishStatus;
}