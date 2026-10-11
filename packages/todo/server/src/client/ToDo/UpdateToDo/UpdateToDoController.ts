import {BaseController} from '@copor/core/client/Core/BaseController';
import {UpdateToDoReqBodyDTO} from './dto/UpdateToDoReqBodyDTO';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {UpdatePrivateToDoInteractorRepoPicker} from './repo/repoPicker/UpdatePrivateToDoInteractorRepoPicker';
import {
	UpdatePrivateToDoValidatorStorageRepoPicker
} from './repo/repoPicker/UpdatePrivateToDoValidatorStorageRepoPicker';
import {UpdatePrivateToDoLoggerRepoPicker} from './repo/repoPicker/UpdatePrivateToDoLoggerRepoPicker';
import {SavePrivateToDoDTO} from '@copor/todo/domain/ToDo/PrivateToDo/interactor/dto/SavePrivateToDoDTO';
import {ValidateUpdatePrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/validation/ValidateUpdatePrivateToDo';
import {UpdatePrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/interactor/UpdatePrivateToDo';
import {LogDataForUpdatePrivateToDo, LogUpdatePrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/logger/LogUpdatePrivateToDo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {stringToDateTime} from '@copor/core/client/Core/Helpers/DateTransformer';
import {UpdateToDoValidatorPermissionRepoPicker} from '@copor/todo/client/ToDo/UpdateToDo/repo/repoPicker/UpdateToDoValidatorPermissionRepoPicker';

export interface ToDoUpdatedNotificationTranslationData {
	author: string;
}

export class UpdateToDoController extends BaseController<UpdateToDoReqBodyDTO, void> {
	async getResponse() {
		const factory = this.container.getFactory(
			RunFactory,
			this.getValidator(),
			this.getInteractor(),
			this.getLogger()
		);

		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		this.response.status(200);
		this.response.send();
	}

	private getValidator(): Validator {
		const validatorPermissionRepo = this.container.getNewRepoPicker(UpdateToDoValidatorPermissionRepoPicker);
		const validatorStorageRepo = this.container.getNewRepoPicker(
			UpdatePrivateToDoValidatorStorageRepoPicker
		);

		return this.container.getValidator(
			ValidateUpdatePrivateToDo,
			this.getPrivateToDoValidatorInput(),
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	private getPrivateToDoValidatorInput(): SavePrivateToDoDTO {
		return {
			... this.request.body,
			deadline: this.request.body.deadline ? stringToDateTime(this.request.body.deadline) : undefined,
			scheduledTime: this.request.body.scheduledTime ? stringToDateTime(this.request.body.scheduledTime) : undefined,
			actorId: this.actorId

		};
	}

	private getInteractor(): UseCase<void> {
		return this.container.getInteractor(
			UpdatePrivateToDo,
			this.container.getNewRepoPicker(UpdatePrivateToDoInteractorRepoPicker),
			this.getPrivateToDoValidatorInput()
		);
	}

	private getLogger(): LogAction {
		const loggerRepo = this.container.getNewRepoPicker(UpdatePrivateToDoLoggerRepoPicker);
		const logData: LogDataForUpdatePrivateToDo = {
			... this.request.body,
			deadline: this.request.body.deadline ? stringToDateTime(this.request.body.deadline) : undefined,
			scheduledTime: this.request.body.scheduledTime ? stringToDateTime(this.request.body.scheduledTime) : undefined
		};

		return this.container.getLogger(
			LogUpdatePrivateToDo,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}
}
