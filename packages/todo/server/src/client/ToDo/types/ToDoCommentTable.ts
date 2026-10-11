import {Generated} from '@copor/core/client/types/tables/Generated';

export interface ToDoCommentTable {
	id: string;
	actorId: string;
	content: string;
	toDoId: string;
	createdAt: Generated<Date>;
	modifiedAt: Generated<Date>;
	createdBy: string;
	modifiedBy: string;
}
