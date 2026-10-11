import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	DeleteToDoCommentValidatorStorageRepoPicker
} from '@copor/todo/client/ToDo/ToDoComment/DeleteToDoComment/repo/repoPicker/DeleteToDoCommentValidatorStorageRepoPicker';
import {
	DeleteToDoCommentInteractorRepoPicker
} from '@copor/todo/client/ToDo/ToDoComment/DeleteToDoComment/repo/repoPicker/DeleteToDoCommentInteractorRepoPicker';
import {
	DeleteToDoCommentLoggerRepoPicker
} from '@copor/todo/client/ToDo/ToDoComment/DeleteToDoComment/repo/repoPicker/DeleteToDoCommentLoggerRepoPicker';
import {ValidateDeleteToDoCommentDTO} from '@copor/todo/domain/ToDo/ToDoComment/validations/dto/ValidateDeleteToDoCommentDTO';
import {ValidateDeleteToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/validations/ValidateDeleteToDoComment';
import {DeleteToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/interactor/DeleteToDoComment';
import {LogDeleteToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/logger/LogDeleteToDoComment';
import {DeleteBaseController} from '@copor/core/client/Core/Controller/DeleteBaseController';

export interface DeleteToDoCommentParams {
	id: string;
}

export class DeleteToDoCommentController extends DeleteBaseController<DeleteToDoCommentParams> {
	protected getValidator(id: string) : Validator {
		const container = this.container;
		const input: ValidateDeleteToDoCommentDTO = {
			id: id,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateDeleteToDoComment,
			input,
			container.getNewRepoPicker(PermissionValidatorRepoPicker),
			container.getNewRepoPicker(DeleteToDoCommentValidatorStorageRepoPicker)
		);
	}

	protected getInteractor(id: string) : UseCase<void> {
		const container = this.container;
		const repo = container.getNewRepoPicker(DeleteToDoCommentInteractorRepoPicker);

		return container.getInteractor(DeleteToDoComment, repo, id);
	}

	protected getLogger(id: string) : LogAction {
		return this.container.getLogger(
			LogDeleteToDoComment,
			this.container.getNewRepoPicker(DeleteToDoCommentLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{deletedCommentId: id}
		);
	}
}
