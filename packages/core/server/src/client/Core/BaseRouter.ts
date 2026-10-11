import {RouterConstructor, RouterInstance} from '../Interface/RouterInstance';
import express, {NextFunction, Request, Response, Router} from 'express';
import {ResponseBody} from '../Interface/ResponseBody';
import {ControllerConstructor, TableControllerConstructor} from './ContainerInstance';
import {Container} from '../Interface/Container';
import {
	UnexpectedErrorLoggerRepoPicker
} from '@copor/core/client/Core/ErrorLogger/repo/repoPicker/UnexpectedErrorLoggerRepoPicker';

export abstract class BaseRouter implements RouterInstance {
	public readonly router: Router;
	protected readonly container: Container;
	constructor(container: Container) {
		this.container = container;
		this.router = express.Router();
		this.initializeRoutes();
	}

	protected handleRequest<Output>(controllerToCreate: ControllerConstructor) {
		return async (
			request: Request,
			response: Response<ResponseBody<Output>>,
			next: NextFunction
		) => {
			try {
				const controller = this.container.getController(
					controllerToCreate,
					this.container,
					request,
					response,
					next
				);

				await controller.getResponse();
			} catch (error) {
				try {
					const repo = this.container.getNewRepoPicker(UnexpectedErrorLoggerRepoPicker);

					if (error instanceof Error) {
						await repo.log({
							message: error.message,
							stack: error.stack,
							path: request.path,
							method: request.method,
							actorId: this.container.getActorId()
						});
					} else {
						await repo.log({
							message: 'Unknown error',
							path: request.path,
							method: request.method,
							actorId: this.container.getActorId()
						});
					}
				} catch (loggingError) {
					console.error('Failed to log unexpected error', loggingError);
				}

				next(error);
			}
		};
	}
	protected nextRouter(path: string, nextRouter: RouterConstructor<Container>) {
		const nextRouterInstance = new nextRouter(this.container);

		this.router.use(path, nextRouterInstance.router);
	}
	protected get(path: string, controllerToCreate: ControllerConstructor) {
		this.router.get(path, this.handleRequest(controllerToCreate));
	}
	protected post(path: string, controllerToCreate: ControllerConstructor) {
		this.router.post(path, this.handleRequest(controllerToCreate));
	}
	protected delete(path: string, controllerToCreate: ControllerConstructor) {
		this.router.delete(path, this.handleRequest(controllerToCreate));
	}
	protected patch(path: string, controllerToCreate: ControllerConstructor) {
		this.router.patch(path, this.handleRequest(controllerToCreate));
	}
	protected table(controllerToCreate: TableControllerConstructor) {
		this.router.post('/table', this.handleRequest(controllerToCreate));
	}
	protected abstract initializeRoutes(): void;
}
