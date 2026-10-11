import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface SaveNewsDTO {
	id: string;
	title: string;
	summary: string;
	content: string;
	roleId: string[];
	publishStatus: PublishStatus;
	actorId: string;
}