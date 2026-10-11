import {CreateQueuedEmailReqBodyDTO} from './dto/CreateQueuedEmailReqBodyDTO';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {CreateBaseController} from '@copor/core/client/Core/Controller/CreateBaseController';
import {ValidateCreateQueuedEmailDTO} from '@copor/core/domain/Core/EmailOutbox/validation/dto/ValidateCreateQueuedEmailDTO';
import {ValidateCreateQueuedEmail} from '@copor/core/domain/Core/EmailOutbox/validation/ValidateCreateQueuedEmail';
import {SaveQueuedEmailDTO} from '@copor/core/domain/Core/EmailOutbox/interactor/dto/SaveQueuedEmailDTO';
import {CreateQueuedEmailInteractorRepoPicker}
	from '@copor/core/client/Core/EmailOutbox/CreateQueuedEmail/repo/repoPicker/CreateQueuedEmailInteractorRepoPicker';
import {CreateQueuedEmail} from '@copor/core/domain/Core/EmailOutbox/interactor/CreateQueuedEmail';
import {CreateQueuedEmailLoggerRepoPicker}
	from '@copor/core/client/Core/EmailOutbox/CreateQueuedEmail/repo/repoPicker/CreateQueuedEmailLoggerRepoPicker';
import {LogCreateQueuedEmail, LogDataForCreateQueuedEmail} from '@copor/core/domain/Core/EmailOutbox/logger/LogCreateQueuedEmail';

export class CreateQueuedEmailController extends CreateBaseController<CreateQueuedEmailReqBodyDTO> {
	protected getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput: ValidateCreateQueuedEmailDTO = {
			... this.request.body,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateCreateQueuedEmail,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}

	protected getInteractor(uniqueId: string) : UseCase<string> {
		const container = this.container;
		const interactorInput: SaveQueuedEmailDTO = {
			... this.request.body,
			actorId: this.actorId,
			id: uniqueId
		};
		const interactorRepo = container.getNewRepoPicker(CreateQueuedEmailInteractorRepoPicker);

		return container.getInteractor(
			CreateQueuedEmail,
			interactorRepo,
			interactorInput
		);
	}

	protected getLogger(uniqueId: string) : LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(CreateQueuedEmailLoggerRepoPicker);
		const logData = this.getLogData(uniqueId);

		return container.getLogger(
			LogCreateQueuedEmail,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getLogData(uniqueId: string): LogDataForCreateQueuedEmail {
		return {
			... this.request.body,
			id: uniqueId
		};
	}
}
