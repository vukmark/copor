import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface UpdateContractTypeReqBodyDTO {
	id: string;
	name: string;
	description?: string;
	file: string;
	publishStatus: PublishStatus;
}
