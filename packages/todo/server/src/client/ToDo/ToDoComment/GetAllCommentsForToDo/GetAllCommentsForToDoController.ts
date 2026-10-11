import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetToDoCommentViewModel} from '@copor/todo/client/ToDo/ToDoComment/GetToDoComment/GetToDoCommentViewModel';
import {GetToDoCommentDTO} from '@copor/todo/domain/ToDo/ToDoComment/interactor/dto/GetToDoCommentDTO';
import {
	GetAllCommentsForToDoLoggerRepoPicker
} from '@copor/todo/client/ToDo/ToDoComment/GetAllCommentsForToDo/repo/repoPicker/GetAllCommentsForToDoLoggerRepoPicker';
import {
	GetAllCommentsForToDoInteractorRepoPicker
} from '@copor/todo/client/ToDo/ToDoComment/GetAllCommentsForToDo/repo/repoPicker/GetAllCommentsForToDoInteractorRepoPicker';
import {LogGetAllCommentsForToDo} from '@copor/todo/domain/ToDo/ToDoComment/logger/LogGetAllCommentsForToDo';
import {GetAllCommentsForToDo} from '@copor/todo/domain/ToDo/ToDoComment/interactor/GetAllCommentsForToDo';
import {ValidateGetAllCommentsForToDo} from '@copor/todo/domain/ToDo/ToDoComment/validations/ValidateGetAllCommentsForToDo';
import {
	GetAllCommentsForToDoPresenter
} from '@copor/todo/client/ToDo/ToDoComment/GetAllCommentsForToDo/GetAllCommentsForToDoPresenter';

interface GetAllCommentsForToDoParams {
	toDoId: string
}
export class GetAllCommentsForToDoController extends BaseController<void, GetToDoCommentViewModel[]> {
	async getResponse() {
		const params = this.request.params as GetAllCommentsForToDoParams;
		const container = this.container;
		const factory = container.getFactory(
            RunFactory<GetToDoCommentDTO[]>,
            this.getValidator(),
            this.getInteractor(params.toDoId),

            this.getLogger()
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		const presenter = this.container.getPresenter(GetAllCommentsForToDoPresenter, response);
		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}
	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput = this.actorId;

		return container.getValidator(
			ValidateGetAllCommentsForToDo,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}
	private getInteractor(toDoId: string) {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetAllCommentsForToDoInteractorRepoPicker);

		return container.getInteractor(GetAllCommentsForToDo, interactorRepo, toDoId);
	}
	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetAllCommentsForToDoLoggerRepoPicker);

		return container.getLogger(LogGetAllCommentsForToDo, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
