import {ContentType} from '@copor/core/domain/Core/enum/ContentType';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface CreateContentItemReqBodyDTO {
	title: string;
	summary: string;
	content: string;
	roleId?: string[];
	publishStatus: PublishStatus;
	contentType: ContentType;
}