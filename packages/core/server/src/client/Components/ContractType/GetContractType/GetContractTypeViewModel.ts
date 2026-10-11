import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface GetContractTypeViewModel {
	id: string;
	name: string;
	file: string;
	description?: string;
	publishStatus: PublishStatus;
}