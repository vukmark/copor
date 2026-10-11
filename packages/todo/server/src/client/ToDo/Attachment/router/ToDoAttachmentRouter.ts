import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {MulterFileMiddleware} from '@copor/core/client/Core/Middleware/MulterImageMiddleware';
import {CreateToDoAttachmentController} from '@copor/todo/client/ToDo/Attachment/CreateAttachment/CreateToDoAttachmentController';
import {GetToDoAttachmentController} from '@copor/todo/client/ToDo/Attachment/GetAttachment/GetToDoAttachmentController';
import {DeleteToDoAttachmentController} from '@copor/todo/client/ToDo/Attachment/DeleteAttachment/DeleteToDoAttachmentController';

export class ToDoAttachmentRouter extends BaseRouter {
	protected initializeRoutes(): void {
		this.get('/:id', GetToDoAttachmentController);
		this.delete('/:id', DeleteToDoAttachmentController);

		this.router.post(
			'/:todoId',
			MulterFileMiddleware.single(
				this.container.appContext,
				'file',
				Number(this.container.appContext.envVariables!.TODO_MAX_FILE_SIZE_MB)
			),
			(req, res, next) => {
				const controller = new CreateToDoAttachmentController(this.container, req, res, next);

				void controller.getResponse();
			}
		);
	}
}
