import {Generated} from './Generated';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface Country {
	id: string;
	code: string;
	name: string;
	createdAt: Generated<Date>;
	createdBy: string;
	modifiedAt: Generated<Date>;
	modifiedBy: string;
	publishStatus: Generated<PublishStatus>;
}
