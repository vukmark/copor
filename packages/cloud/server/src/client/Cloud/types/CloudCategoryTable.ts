import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {Generated} from '@copor/core/client/types/tables/Generated';

export interface CloudCategoryTable {
	id: string;
	categoryType: string;
	description: string | null;
	name: string;
	publishStatus: Generated<PublishStatus>;
	createdAt: Generated<Date>;
	createdBy: string | null;
	modifiedAt: Generated<Date>;
	modifiedBy: string | null;
}
