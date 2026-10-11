import {Generated} from '@copor/core/client/types/tables/Generated';

export interface ToDoAttachmentTable {
	id: string;
	toDoId: string;
	name: string;
	size: number;
	createdAt: Generated<Date>;
	createdBy: string;
}
