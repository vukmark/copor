import {Controller} from '../Interface/Controller';
import {NextFunction, Response, Request} from 'express';
import {Container} from '../Interface/Container';
import {PresenterConstructor} from './ContainerInstance';
import {DtoStringTrimmer} from '@copor/core/client/Core/Helpers/DtoStringTrimmer';

export abstract class BaseController<Input, Output> implements Controller {
	protected readonly request: Request<unknown, unknown, Input>;
	protected readonly container: Container;
	protected readonly actorId: string;
	protected readonly next: NextFunction;
	protected readonly response: Response<Output>;

	constructor(container: Container, request: Request<unknown, unknown, Input>, response: Response<Output>, next: NextFunction) {
		this.next = next;
		this.response = response;
		this.container = container;
		this.request = request;
		this.actorId = this.container.getActorId();

		if (this.request.body) {
			this.request.body = DtoStringTrimmer.trimStrings(this.request.body);
		}
	}

	protected present<Input, Output>(
		presenterToCreate: PresenterConstructor<Input, Output>,
		presenterInput: Input) {
		const presenter = this.container.getPresenter(presenterToCreate, presenterInput);

		return presenter.present();
	}

	public abstract getResponse(): void;
}
