import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface GetContractTypeDTO {
	id: string;
	name: string;
	file: string;
	description?: string;
	publishStatus: PublishStatus;
}
