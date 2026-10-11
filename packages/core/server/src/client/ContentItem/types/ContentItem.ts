import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {ContentType} from '@copor/core/domain/Core/enum/ContentType';
import {Generated} from '@copor/core/client/types/tables/Generated';

export interface ContentItem {
	id: string;
	title: string;
	summary: string;
	content: string;
	publishStatus: Generated<PublishStatus>;
	contentType: ContentType;
	createdBy: string;
	createdAt: Generated<Date>;
	modifiedBy: string;
	modifiedAt: Generated<Date>;
}