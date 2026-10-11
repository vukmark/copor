import {BaseController} from '@copor/core/client/Core/BaseController';
import {
	DeletePrivateToDoValidatorStorageRepoPicker
} from './repo/repoPicker/DeletePrivateToDoValidatorStorageRepoPicker';
import {DeletePrivateToDoInteractorRepoPicker} from './repo/repoPicker/DeletePrivateToDoInteractorRepoPicker';
import {DeletePrivateToDoLoggerRepoPicker} from './repo/repoPicker/DeletePrivateToDoLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {ValidateDeletePrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/validation/ValidateDeletePrivateToDo';
import {DeletePrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/interactor/DeletePrivateToDo';
import {LogDeletePrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/logger/LogDeletePrivateToDo';
import {ValidateDeletePrivateToDoDTO} from '@copor/todo/domain/ToDo/PrivateToDo/validation/dto/ValidateDeletePrivateToDoDTO';
import {ToDoType} from '@copor/todo/domain/ToDo/enum/ToDoType';
import {
	DeletePrivateToDoPermissionValidatorRepoPicker
} from '@copor/todo/client/ToDo/DeleteToDo/repo/repoPicker/DeletePrivateToDoPermissionValidatorRepoPicker';

export interface DeleteToDoParams {
	id: string;
	type: ToDoType;
}
export interface ToDoDeletedNotificationTranslationData {
	author: string;
}

export class DeleteToDoController extends BaseController<void, void> {
	async getResponse() {
		const params = this.request.params as DeleteToDoParams;
		const id: string = params.id;

		const factory = this.container.getFactory(
			RunFactory<void>,
			this.getValidator(id),
			this.getInteractor(id),
			this.getLogger(id)
		);

		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		this.response.status(200);
		this.response.send();
	}

	private getValidator(id: string) : Validator {
		const container = this.container;

		const input: ValidateDeletePrivateToDoDTO = {
			actorId: this.actorId,
			toDoId: id
		};

		return container.getValidator(
			ValidateDeletePrivateToDo,
			input,
			container.getNewRepoPicker(DeletePrivateToDoPermissionValidatorRepoPicker),
			container.getNewRepoPicker(DeletePrivateToDoValidatorStorageRepoPicker)
		);
	}

	private getInteractor(id: string) : UseCase<void> {
		const container = this.container;
		const repo = container.getNewRepoPicker(DeletePrivateToDoInteractorRepoPicker);

		return container.getInteractor(DeletePrivateToDo, repo, id);
	}

	private getLogger(id: string) : LogAction {
		return this.container.getLogger(
			LogDeletePrivateToDo,
			this.container.getNewRepoPicker(DeletePrivateToDoLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{toDoId: id}
		);
	}
}
