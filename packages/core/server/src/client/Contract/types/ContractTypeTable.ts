import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {Generated} from '@copor/core/client/types/tables/Generated';

export interface ContractTypeTable {
	id: string;
	description: string | null;
	file: string;
	name: string;
	publishStatus: Generated<PublishStatus>;
	createdAt: Generated<Date>;
	createdBy: string;
	modifiedAt: Generated<Date>;
	modifiedBy: string;
}
