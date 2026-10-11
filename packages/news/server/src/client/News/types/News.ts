import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {Generated} from '@copor/core/client/types/tables/Generated';

export interface News {
	id: string;
	title: string;
	summary: string;
	content: string;
	publishStatus: Generated<PublishStatus>;
	createdBy: string;
	createdAt: Generated<Date>;
	modifiedBy: string;
	modifiedAt: Generated<Date>;
}
