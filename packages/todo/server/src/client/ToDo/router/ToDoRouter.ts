import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {UpdateToDoController} from '@copor/todo/client/ToDo/UpdateToDo/UpdateToDoController';
import {DeleteToDoController} from '@copor/todo/client/ToDo/DeleteToDo/DeleteToDoController';
import {CreateToDoController} from '@copor/todo/client/ToDo/CreateToDo/CreateToDoController';
import {GetToDoController} from '@copor/todo/client/ToDo/GetToDo/GetToDoController';
import {GetAllToDosForUserController} from '../GetAllToDosForUser/GetAllToDosForUserController';
import {ToDoCommentRouter} from '@copor/todo/client/ToDo/ToDoComment/router/ToDoCommentRouter';
import {ToDoAlarmRouter} from '@copor/todo/client/ToDo/Alarm/router/ToDoAlarmRouter';
import {ToDoAttachmentRouter} from '@copor/todo/client/ToDo/Attachment/router/ToDoAttachmentRouter';

export class ToDoRouter extends BaseRouter {
	protected initializeRoutes(): void {
		this.patch('/', UpdateToDoController);
		this.post('/', CreateToDoController);
		this.post('/get-all-for-user', GetAllToDosForUserController);
		this.nextRouter('/comment', ToDoCommentRouter);
		this.nextRouter('/alarm', ToDoAlarmRouter);
		this.nextRouter('/attachment', ToDoAttachmentRouter);
		this.get('/:id/:type', GetToDoController);
		this.delete('/:id/:type', DeleteToDoController);
	}
}
