import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateUpdateAiContextItem} from '@copor/ai_context_item/domain/AiContextItem/validations/ValidateUpdateAiContextItem';
import {SaveAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/interactor/dto/SaveAiContextItemDTO';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {UpdateAiContextItem} from '@copor/ai_context_item/domain/AiContextItem/interactor/UpdateAiContextItem';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {LogDataForUpdateAiContextItem, LogUpdateAiContextItem} from '@copor/ai_context_item/domain/AiContextItem/logger/LogUpdateAiContextItem';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {UpdateAiContextItemReqBodyDTO} from '@copor/ai_context_item/client/AiContextItem/UpdateContextItem/dto/UpdateAiContextItemReqBodyDTO';
import {
	UpdateAiContextItemValidatorStorageRepoPicker
} from '@copor/ai_context_item/client/AiContextItem/UpdateContextItem/repo/repoPicker/UpdateAiContextItemValidatorStorageRepoPicker';
import {
	UpdateAiContextItemInteractorRepoPicker
} from '@copor/ai_context_item/client/AiContextItem/UpdateContextItem/repo/repoPicker/UpdateAiContextItemInteractorRepoPicker';
import {
	UpdateAiContextItemLoggerRepoPicker
} from '@copor/ai_context_item/client/AiContextItem/UpdateContextItem/repo/repoPicker/UpdateAiContextItemLoggerRepoPicker';

export class UpdateAiContextItemController extends UpdateBaseController<UpdateAiContextItemReqBodyDTO> {
	protected getValidator(): Validator {
		const validatorPermissionRepo = this.container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = this.container.getNewRepoPicker(UpdateAiContextItemValidatorStorageRepoPicker);

		return this.container.getValidator(
			ValidateUpdateAiContextItem,
			this.getValidatorInput(),
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor(): UseCase<void> {
		return this.container.getInteractor(
			UpdateAiContextItem,
			this.container.getNewRepoPicker(UpdateAiContextItemInteractorRepoPicker),
			this.getValidatorInput()
		);
	}

	protected getLogger(): LogAction {
		const loggerRepo = this.container.getNewRepoPicker(UpdateAiContextItemLoggerRepoPicker);
		const logData: LogDataForUpdateAiContextItem = this.getValidatorInput();

		return this.container.getLogger(
			LogUpdateAiContextItem,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getValidatorInput(): SaveAiContextItemDTO {
		return {
			... this.request.body,
			actorId: this.actorId
		};
	}
}