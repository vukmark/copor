import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetAttachmentForToDoValidatorStorageRepoPicker} from './repo/repoPicker/GetAttachmentForToDoValidatorStorageRepoPicker';
import {GetAttachmentForToDoInteractorRepoPicker} from './repo/repoPicker/GetAttachmentForToDoInteractorRepoPicker';
import {GetAttachmentForToDoLoggerRepoPicker} from './repo/repoPicker/GetAttachmentForToDoLoggerRepoPicker';
import {ValidateGetAttachmentForToDo} from '@copor/todo/domain/ToDo/ToDoItem/validations/ValidateGetAttachmentForToDo';
import {ValidateGetAttachmentForToDoDTO} from '@copor/todo/domain/ToDo/ToDoItem/validations/dto/ValidateGetAttachmentForToDoDTO';
import {GetAttachmentForToDo} from '@copor/todo/domain/ToDo/ToDoItem/interactor/GetAttachmentForToDo';
import {GetAttachmentForToDoDTO} from '@copor/todo/domain/ToDo/ToDoItem/interactor/dto/GetAttachmentForToDoDTO';
import {LogGetAttachmentForToDo} from '@copor/todo/domain/ToDo/ToDoItem/logger/LogGetAttachmentForToDo';

export interface GetToDoAttachmentParams {
	id: string;
}

export class GetToDoAttachmentController extends BaseController<undefined, Buffer> {
	async getResponse() {
		const id = (this.request.params as GetToDoAttachmentParams).id;
		const container = this.container;

		const factory = container.getFactory(
			RunFactory<GetAttachmentForToDoDTO>,
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
		this.response.setHeader('Content-Disposition', `attachment; filename="${response.fileName}"`);
		this.response.send(response.file);
	}

	private getValidator(id: string) {
		const container = this.container;
		const validatorInput: ValidateGetAttachmentForToDoDTO = {
			id,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateGetAttachmentForToDo,
			validatorInput,
			container.getNewRepoPicker(PermissionValidatorRepoPicker),
			container.getNewRepoPicker(GetAttachmentForToDoValidatorStorageRepoPicker)
		);
	}

	private getInteractor(id: string) {
		const container = this.container;
		const interactorRepo = container.getNewRepoPicker(GetAttachmentForToDoInteractorRepoPicker);

		return container.getInteractor(GetAttachmentForToDo, interactorRepo, id);
	}

	private getLogger(id: string) {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetAttachmentForToDoLoggerRepoPicker);

		return container.getLogger(LogGetAttachmentForToDo, loggerRepo, new CreateLogDetails(this.actorId), {attachmentId: id});
	}
}
