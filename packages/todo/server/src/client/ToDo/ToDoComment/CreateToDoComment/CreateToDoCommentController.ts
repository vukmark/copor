import {CreateToDoCommentReqBodyDTO} from '@copor/todo/client/ToDo/ToDoComment/CreateToDoComment/dto/CreateToDoCommentReqBodyDTO';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	CreateToDoCommentValidatorStorageRepoPicker
} from '@copor/todo/client/ToDo/ToDoComment/CreateToDoComment/repo/repoPicker/CreateToDoCommentValidatorStorageRepoPicker';
import {
	CreateToDoCommentInteractorRepoPicker
} from '@copor/todo/client/ToDo/ToDoComment/CreateToDoComment/repo/repoPicker/CreateToDoCommentInteractorRepoPicker';
import {
	CreateToDoCommentLoggerRepoPicker
} from '@copor/todo/client/ToDo/ToDoComment/CreateToDoComment/repo/repoPicker/CreateToDoCommentLoggerRepoPicker';
import {ValidateCreateToDoCommentDTO} from '@copor/todo/domain/ToDo/ToDoComment/validations/dto/ValidateCreateToDoCommentDTO';
import {LogCreateToDoComment, LogDataForCreateToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/logger/LogCreateToDoComment';
import {CreateToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/interactor/CreateToDoComment';
import {SaveToDoCommentDTO} from '@copor/todo/domain/ToDo/ToDoComment/interactor/dto/SaveToDoCommentDTO';
import {ValidateCreateToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/validations/ValidateCreateToDoComment';
import {CreateBaseController} from '@copor/core/client/Core/Controller/CreateBaseController';

export class CreateToDoCommentController extends CreateBaseController<CreateToDoCommentReqBodyDTO> {
	protected getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo
			= container.getNewRepoPicker(CreateToDoCommentValidatorStorageRepoPicker);
		const validatorInput: ValidateCreateToDoCommentDTO = {
			... this.request.body,
			actorId: this.actorId,
			createdAt: new Date()
		};

		return container.getValidator(
			ValidateCreateToDoComment,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor(uniqueId: string) : UseCase<string> {
		const container = this.container;
		const interactorInput: SaveToDoCommentDTO = {
			actorId: this.actorId,
			id: uniqueId,
			toDoId: this.request.body.toDoId,
			createdAt: new Date(),
			content: this.request.body.content
		};
		const interactorRepo = container.getNewRepoPicker(CreateToDoCommentInteractorRepoPicker);

		return container.getInteractor(
			CreateToDoComment,
			interactorRepo,
			interactorInput
		);
	}

	protected getLogger(uniqueId: string) : LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(CreateToDoCommentLoggerRepoPicker);
		const logData = this.getLogData(uniqueId);

		return container.getLogger(
			LogCreateToDoComment,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getLogData(uniqueId: string): LogDataForCreateToDoComment {
		return {
			id: uniqueId,
			actorId: this.actorId,
			content: this.request.body.content,
			createdAt: new Date(),
			toDoId: this.request.body.toDoId
		};
	}
}
