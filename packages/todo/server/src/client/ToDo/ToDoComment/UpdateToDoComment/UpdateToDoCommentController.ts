import {UpdateToDoCommentReqBodyDTO} from './dto/UpdateToDoCommentReqBodyDTO';
import {
	UpdateToDoCommentValidatorStorageRepoPicker
} from './repo/repoPicker/UpdateToDoCommentValidatorStorageRepoPicker';
import {UpdateToDoCommentInteractorRepoPicker} from './repo/repoPicker/UpdateToDoCommentInteractorRepoPicker';
import {UpdateToDoCommentLoggerRepoPicker} from './repo/repoPicker/UpdateToDoCommentLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateUpdateToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/validations/ValidateUpdateToDoComment';
import {UpdateToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/interactor/UpdateToDoComment';
import {LogDataForUpdateToDoComment, LogUpdateToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/logger/LogUpdateToDoComment';
import {SaveToDoCommentDTO} from '@copor/todo/domain/ToDo/ToDoComment/interactor/dto/SaveToDoCommentDTO';
import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';

export class UpdateToDoCommentController extends UpdateBaseController<UpdateToDoCommentReqBodyDTO> {
	protected getValidator(): Validator {
		const validatorPermissionRepo = this.container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = this.container.getNewRepoPicker(
			UpdateToDoCommentValidatorStorageRepoPicker
		);

		return this.container.getValidator(
			ValidateUpdateToDoComment,
			this.getValidatorInput(),
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor() {
		return this.container.getInteractor(
			UpdateToDoComment,
			this.container.getNewRepoPicker(UpdateToDoCommentInteractorRepoPicker),
			this.getValidatorInput()
		);
	}

	protected getLogger() {
		const loggerRepo
			= this.container.getNewRepoPicker(UpdateToDoCommentLoggerRepoPicker);
		const logData: LogDataForUpdateToDoComment = {
			... this.request.body,
			actorId: this.actorId
		};

		return this.container.getLogger(
			LogUpdateToDoComment,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getValidatorInput(): SaveToDoCommentDTO {
		return {
			... this.request.body,
			createdAt: new Date(),
			actorId: this.actorId
		};
	}
}
