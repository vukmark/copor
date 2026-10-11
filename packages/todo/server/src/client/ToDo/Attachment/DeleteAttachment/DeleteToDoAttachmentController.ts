import {DeleteBaseController} from '@copor/core/client/Core/Controller/DeleteBaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {DeleteAttachmentForToDoValidatorStorageRepoPicker} from './repo/repoPicker/DeleteAttachmentForToDoValidatorStorageRepoPicker';
import {DeleteAttachmentForToDoInteractorRepoPicker} from './repo/repoPicker/DeleteAttachmentForToDoInteractorRepoPicker';
import {DeleteAttachmentForToDoLoggerRepoPicker} from './repo/repoPicker/DeleteAttachmentForToDoLoggerRepoPicker';
import {ValidateDeleteAttachmentForToDo} from '@copor/todo/domain/ToDo/ToDoItem/validations/ValidateDeleteAttachmentForToDo';
import {ValidateDeleteAttachmentForToDoDTO} from '@copor/todo/domain/ToDo/ToDoItem/validations/dto/ValidateDeleteAttachmentForToDoDTO';
import {DeleteAttachmentForToDo} from '@copor/todo/domain/ToDo/ToDoItem/interactor/DeleteAttachmentForToDo';
import {LogDeleteAttachmentForToDo} from '@copor/todo/domain/ToDo/ToDoItem/logger/LogDeleteAttachmentForToDo';

export class DeleteToDoAttachmentController extends DeleteBaseController<{id: string}> {
	protected getValidator(id: string): Validator {
		const container = this.container;
		const validatorInput: ValidateDeleteAttachmentForToDoDTO = {
			attachmentId: id,
			actorUserId: this.actorId
		};

		return container.getValidator(
			ValidateDeleteAttachmentForToDo,
			validatorInput,
			container.getNewRepoPicker(PermissionValidatorRepoPicker),
			container.getNewRepoPicker(DeleteAttachmentForToDoValidatorStorageRepoPicker)
		);
	}

	protected getInteractor(id: string): UseCase<void> {
		const container = this.container;
		const interactorRepo = container.getNewRepoPicker(DeleteAttachmentForToDoInteractorRepoPicker);

		return container.getInteractor(DeleteAttachmentForToDo, interactorRepo, id);
	}

	protected getLogger(id: string): LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(DeleteAttachmentForToDoLoggerRepoPicker);

		return container.getLogger(LogDeleteAttachmentForToDo, loggerRepo, new CreateLogDetails(this.actorId), {deletedAttachmentId: id});
	}
}
