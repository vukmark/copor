import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {CreateImageController} from '@copor/core/client/Components/Image/CreateImage/CreateImageController';
import {DeleteImageController} from '@copor/core/client/Components/Image/DeleteImage/DeleteImageController';
import {GetImageController} from '@copor/core/client/Components/Image/GetImage/GetImageController';
import {MulterImageMiddleware} from '@copor/core/client/Core/Middleware/MulterImageMiddleware';
//AUTO_IMPORT_DO_NOT_EDIT

export class ImageRouter extends BaseRouter {
	protected initializeRoutes(): void {
		//AUTO_INSERT_DO_NOT_EDIT
		//this.patch('/', UpdateImageController);

		this.get('/:id', GetImageController);
		this.delete('/:id', DeleteImageController);
		this.router.post(
			'/',
			MulterImageMiddleware.single(this.container.appContext),
			(req, res, next) => {
				const controller = new CreateImageController(this.container, req, res, next);

				void controller.getResponse();
			}
		);
	}
}