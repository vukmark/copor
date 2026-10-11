import {cloudMaxFileSizeMb} from '@copor/cloud/client/Cloud/CloudConfig';
import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {MulterFileMiddleware} from '@copor/core/client/Core/Middleware/MulterImageMiddleware';
import {CreateUserGroupFileController} from '@copor/cloud/client/Cloud/CreateFile/CreateUserGroupFileController';
import {GetFileListController} from '@copor/cloud/client/Cloud/GetFileList/GetFileListController';
import {GetFileController} from '@copor/cloud/client/Cloud/GetFile/GetFileController';
import {DeleteFileController} from '@copor/cloud/client/Cloud/DeleteFile/DeleteFileController';
import {CreatePrivateFileController} from '@copor/cloud/client/Cloud/CreateFile/CreatePrivateFileController';
import {CreatePublicFileController} from '@copor/cloud/client/Cloud/CreateFile/CreatePublicFileController';
import {BulkDeleteFileController} from '@copor/cloud/client/Cloud/DeleteFile/BulkDeleteFileController';
import {GetShareRecipientListController} from '@copor/cloud/client/Cloud/GetShareRecipientList/GetShareRecipientListController';

export class CloudRouter extends BaseRouter {
	protected initializeRoutes(): void {
		this.router.post(
			'/USER_GROUP/:groupId/*',
			MulterFileMiddleware.single(this.container.appContext, 'file', cloudMaxFileSizeMb(this.container.appContext)),
			(req, res, next) => {
				const controller = new CreateUserGroupFileController(this.container, req, res, next);

				void controller.getResponse();
			}
		);

		this.router.post(
			'/PRIVATE/*',
			MulterFileMiddleware.single(this.container.appContext, 'file', cloudMaxFileSizeMb(this.container.appContext)),
			(req, res, next) => {
				const controller = new CreatePrivateFileController(this.container, req, res, next);

				void controller.getResponse();
			}
		);
		this.router.post(
			'/PUBLIC/USER/:userId/*',
			MulterFileMiddleware.single(this.container.appContext, 'file', cloudMaxFileSizeMb(this.container.appContext)),
			(req, res, next) => {
				const controller = new CreatePublicFileController(this.container, req, res, next);

				void controller.getResponse();
			}
		);
		this.router.post(
			'/PUBLIC/*',
			MulterFileMiddleware.single(this.container.appContext, 'file', cloudMaxFileSizeMb(this.container.appContext)),
			(req, res, next) => {
				const controller = new CreatePublicFileController(this.container, req, res, next);

				void controller.getResponse();
			}
		);
		this.post('/recipients', GetShareRecipientListController);
		this.get('/', GetFileListController);
		this.get('/:id', GetFileController);
		this.delete('/bulk', BulkDeleteFileController);
		this.delete('/:id', DeleteFileController);
	}
}
