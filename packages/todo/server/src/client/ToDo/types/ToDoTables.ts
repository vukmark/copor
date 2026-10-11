import {PrivateTodoTable} from '@copor/todo/client/ToDo/types/PrivateTodoTable';
import {ToDoCommentTable} from '@copor/todo/client/ToDo/types/ToDoCommentTable';
import {ToDoTagMapTable} from '@copor/todo/client/ToDo/types/ToDoTagMapTable';
import {AlarmTable} from '@copor/todo/client/ToDo/types/AlarmTable';
import {ToDoAttachmentTable} from '@copor/todo/client/ToDo/types/ToDoAttachmentTable';

// The ToDo module's tables, added to core's DB interface.
declare module '@copor/core/client/types/db' {
	interface DB {
		privateToDo: PrivateTodoTable;
		toDoComment: ToDoCommentTable;
		toDoTagMap: ToDoTagMapTable;
		alarm: AlarmTable;
		toDoAttachment: ToDoAttachmentTable;
	}
}
