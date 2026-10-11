import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {IdGenerator} from '@copor/core/client/Core/IdGenerator/IdGenerator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	CreateAttachmentForToDoValidatorStorageRepoPicker
} from './repo/repoPicker/CreateAttachmentForToDoValidatorStorageRepoPicker';
import {CreateAttachmentForToDoInteractorRepoPicker} from './repo/repoPicker/CreateAttachmentForToDoInteractorRepoPicker';
import {CreateAttachmentForToDoLoggerRepoPicker} from './repo/repoPicker/CreateAttachmentForToDoLoggerRepoPicker';
import {ValidateCreateAttachmentForToDo} from '@copor/todo/domain/ToDo/ToDoItem/validations/ValidateCreateAttachmentForToDo';
import {SaveAttachmentForToDoDTO} from '@copor/todo/domain/ToDo/ToDoItem/interactor/dto/SaveAttachmentForToDoDTO';
import {CreateAttachmentForToDo} from '@copor/todo/domain/ToDo/ToDoItem/interactor/CreateAttachmentForToDo';
import {LogCreateAttachmentForToDo} from '@copor/todo/domain/ToDo/ToDoItem/logger/LogCreateAttachmentForToDo';
import {ToDoFileHelper} from '@copor/todo/client/ToDo/ToDoFileHelper';

export interface CreateToDoAttachmentParams {
	todoId: string;
}

export class CreateToDoAttachmentController extends BaseController<undefined, string> {
	async getResponse() {
		const container = this.container;
		const todoId = (this.request.params as CreateToDoAttachmentParams).todoId;
		const uniqueId = await this.getUniqueId();

		if (!this.request.file)
			throw new Error('File is required');

		const factory = container.getFactory(
			RunFactory<string>,
			this.getValidator(todoId, uniqueId),
			this.getInteractor(todoId, uniqueId),
			this.getLogger(todoId, uniqueId)
		);

		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		try {
			await ToDoFileHelper.saveFile(this.request.file, {fileId: uniqueId});
		} catch (e) {
			this.next(e);
			return;
		}

		this.response.status(200);
		this.response.send(uniqueId);
	}

	private async getUniqueId(): Promise<string> {
		const uniqueIdGenerator = this.container.getRepository(IdGenerator);

		return await uniqueIdGenerator.getNewId();
	}

	private getValidator(todoId: string, uniqueId: string): Validator {
		const container = this.container;
		const validatorInput: SaveAttachmentForToDoDTO = {
			id: uniqueId,
			todoId,
			name: this.request.file!.originalname,
			size: this.request.file!.size,
			actorId: this.actorId,
			creationDateTime: new Date()
		};

		return container.getValidator(
			ValidateCreateAttachmentForToDo,
			validatorInput,
			container.getNewRepoPicker(PermissionValidatorRepoPicker),
			container.getNewRepoPicker(CreateAttachmentForToDoValidatorStorageRepoPicker)
		);
	}

	private getInteractor(todoId: string, uniqueId: string): UseCase<string> {
		const container = this.container;
		const interactorInput: SaveAttachmentForToDoDTO = {
			id: uniqueId,
			todoId,
			name: this.request.file!.originalname,
			size: this.request.file!.size,
			actorId: this.actorId,
			creationDateTime: new Date()
		};
		const interactorRepo = container.getNewRepoPicker(CreateAttachmentForToDoInteractorRepoPicker);

		return container.getInteractor(CreateAttachmentForToDo, interactorRepo, interactorInput);
	}

	private getLogger(todoId: string, uniqueId: string): LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(CreateAttachmentForToDoLoggerRepoPicker);

		return container.getLogger(
			LogCreateAttachmentForToDo,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			{
				id: uniqueId,
				todoId,
				name: this.request.file!.originalname,
				size: this.request.file!.size
			}
		);
	}
}
