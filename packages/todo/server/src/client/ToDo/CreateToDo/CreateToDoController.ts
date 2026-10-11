import {CreateToDoReqBodyDTO} from './dto/CreateToDoReqBodyDTO';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {
	CreatePrivateToDoValidatorStorageRepoPicker
} from './repo/repoPicker/CreatePrivateToDoValidatorStorageRepoPicker';
import {ValidateCreatePrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/validation/ValidateCreatePrivateToDo';
import {SavePrivateToDoDTO} from '@copor/todo/domain/ToDo/PrivateToDo/interactor/dto/SavePrivateToDoDTO';
import {ValidateCreatePrivateToDoDTO} from '@copor/todo/domain/ToDo/PrivateToDo/validation/dto/ValidateCreatePrivateToDoDTO';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {CreatePrivateToDoInteractorRepoPicker} from './repo/repoPicker/CreatePrivateToDoInteractorRepoPicker';
import {CreatePrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/interactor/CreatePrivateToDo';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {CreatePrivateToDoLoggerRepoPicker} from './repo/repoPicker/CreatePrivateToDoLoggerRepoPicker';
import {LogCreatePrivateToDo, LogDataForCreatePrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/logger/LogCreatePrivateToDo';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {stringToDateTime} from '@copor/core/client/Core/Helpers/DateTransformer';
import {CreateBaseController} from '@copor/core/client/Core/Controller/CreateBaseController';

export class CreateToDoController extends CreateBaseController<CreateToDoReqBodyDTO> {
	protected getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = container.getNewRepoPicker(CreatePrivateToDoValidatorStorageRepoPicker);
		const validatorInput: ValidateCreatePrivateToDoDTO = {
			... this.request.body,
			deadline: this.request.body.deadline ? stringToDateTime(this.request.body.deadline) : undefined,
			scheduledTime: this.request.body.scheduledTime ? stringToDateTime(this.request.body.scheduledTime) : undefined,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateCreatePrivateToDo,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor(uniqueId: string) : UseCase<string> {
		const container = this.container;
		const interactorInput: SavePrivateToDoDTO = {
			... this.request.body,
			deadline: this.request.body.deadline ? stringToDateTime(this.request.body.deadline) : undefined,
			scheduledTime: this.request.body.scheduledTime ? stringToDateTime(this.request.body.scheduledTime) : undefined,
			actorId: this.actorId,
			id: uniqueId
		};
		const interactorRepo = container.getNewRepoPicker(CreatePrivateToDoInteractorRepoPicker);

		return container.getInteractor(
			CreatePrivateToDo,
			interactorRepo,
			interactorInput
		);
	}

	protected getLogger(uniqueId: string) : LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(CreatePrivateToDoLoggerRepoPicker);
		const logData = this.getLogDataForPrivateToDo(uniqueId);

		return container.getLogger(
			LogCreatePrivateToDo,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getLogDataForPrivateToDo(uniqueId: string): LogDataForCreatePrivateToDo {
		return {
			... this.request.body,
			id: uniqueId,
			deadline: this.request.body.deadline ? stringToDateTime(this.request.body.deadline) : undefined,
			scheduledTime: this.request.body.scheduledTime ? stringToDateTime(this.request.body.scheduledTime) : undefined,
			actorId: this.actorId
		};
	}
}
