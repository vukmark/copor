import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {ContentType} from '@copor/core/domain/Core/enum/ContentType';

export interface UpdateContentItemReqBodyDTO {
	id: string;
	title: string;
	summary: string;
	content: string;
	roleId?: string[];
	publishStatus: PublishStatus;
	contentType: ContentType;
}