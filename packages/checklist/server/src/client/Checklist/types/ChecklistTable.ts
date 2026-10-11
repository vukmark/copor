import {Generated} from '@copor/core/client/types/tables/Generated';

export interface ChecklistTable {
	id: string;
	actorId: string;
	title: string | null;
	createdAt: Generated<Date>;
	createdBy: string;
	modifiedAt: Generated<Date>;
	modifiedBy: string;
}
