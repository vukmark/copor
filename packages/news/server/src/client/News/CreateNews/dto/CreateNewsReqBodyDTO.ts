import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface CreateNewsReqBodyDTO {
	title: string;
	summary: string;
	content: string;
	roleId: string[];
	publishStatus: PublishStatus;
}