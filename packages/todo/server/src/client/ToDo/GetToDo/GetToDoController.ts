import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetToDoViewModel} from './GetToDoViewModel';
import {GetPrivateToDoInteractorRepoPicker} from './repo/repoPicker/GetPrivateToDoInteractorRepoPicker';
import {GetPrivateToDoLoggerRepoPicker} from './repo/repoPicker/GetPrivateToDoLoggerRepoPicker';
import {GetToDoPresenter} from './GetToDoPresenter';
import {GetPrivateToDoDTO} from '@copor/todo/domain/ToDo/PrivateToDo/interactor/dto/GetPrivateToDoDTO';
import {ValidateGetPrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/validation/ValidateGetPrivateToDo';
import {ValidateToDoDTO} from '@copor/todo/domain/ToDo/ToDoItem/validations/dto/ValidateToDoDTO';
import {LogGetPrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/logger/LogGetPrivateToDo';
import {GetPrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/interactor/GetPrivateToDo';
import {ToDoType} from '@copor/todo/domain/ToDo/enum/ToDoType';
import {
	GetPrivateToDoValidatorPermissionRepoPicker
} from '@copor/todo/client/ToDo/GetToDo/repo/repoPicker/GetPrivateToDoValidatorPermissionRepoPicker';

export interface GetToDoParams {
	id: string;
	type: ToDoType;
}

export class GetToDoController extends BaseController<undefined, GetToDoViewModel> {
	async getResponse(): Promise<void> {
		const params = this.request.params as GetToDoParams;
		const id: string = params.id;
		const actorId = this.actorId;

		const factory = this.container.getFactory(
			RunFactory<GetPrivateToDoDTO>,
			this.getValidator(actorId, id),
			this.getInteractor(id),
			this.getLogger(actorId, id)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = new GetToDoPresenter(response, this.container.appContext);
		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}

	private getValidator(actorId: string, id: string) {
		const c = this.container;
		const validatorInput: ValidateToDoDTO = {actorUserId: actorId, todoId: id};

		return c.getValidator(
			ValidateGetPrivateToDo,
			validatorInput,
			c.getNewRepoPicker(GetPrivateToDoValidatorPermissionRepoPicker),
			undefined
		);
	}

	private getLogger(actorId: string, id: string) {
		return this.container.getLogger(
			LogGetPrivateToDo,
			this.container.getNewRepoPicker(GetPrivateToDoLoggerRepoPicker),
			new CreateLogDetails(actorId),
			{todoId: id}
		);
	}

	private getInteractor(id: string) {
		return this.container.getInteractor(
			GetPrivateToDo,
			this.container.getNewRepoPicker(GetPrivateToDoInteractorRepoPicker),
			id
		);
	}
}
