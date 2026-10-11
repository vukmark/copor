import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {CreateToDoCommentController} from '@copor/todo/client/ToDo/ToDoComment/CreateToDoComment/CreateToDoCommentController';
import {DeleteToDoCommentController} from '@copor/todo/client/ToDo/ToDoComment/DeleteToDoComment/DeleteToDoCommentController';
import {GetToDoCommentController} from '@copor/todo/client/ToDo/ToDoComment/GetToDoComment/GetToDoCommentController';
import {UpdateToDoCommentController} from '@copor/todo/client/ToDo/ToDoComment/UpdateToDoComment/UpdateToDoCommentController';
import {
    GetAllCommentsForToDoController
} from '@copor/todo/client/ToDo/ToDoComment/GetAllCommentsForToDo/GetAllCommentsForToDoController';

export class ToDoCommentRouter extends BaseRouter {
	protected initializeRoutes(): void {
		// routers like:
		this.post('/', CreateToDoCommentController);
		this.delete('/:id', DeleteToDoCommentController);
		this.get('/:id', GetToDoCommentController);
		this.patch('/', UpdateToDoCommentController);
		this.get('/comment-list/:toDoId', GetAllCommentsForToDoController);
	}
}