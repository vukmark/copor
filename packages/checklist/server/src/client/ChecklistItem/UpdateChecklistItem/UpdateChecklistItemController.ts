import {UpdateChecklistItemReqBodyDTO} from './dto/UpdateChecklistItemReqBodyDTO';
import {UpdateChecklistItemValidatorStorageRepoPicker} from './repo/repoPicker/UpdateChecklistItemValidatorStorageRepoPicker';
import {UpdateChecklistItemInteractorRepoPicker} from './repo/repoPicker/UpdateChecklistItemInteractorRepoPicker';
import {UpdateChecklistItemLoggerRepoPicker} from './repo/repoPicker/UpdateChecklistItemLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateUpdateChecklistItem} from '@copor/checklist/domain/ChecklistItem/validations/ValidateUpdateChecklistItem';
import {UpdateChecklistItem} from '@copor/checklist/domain/ChecklistItem/interactor/UpdateChecklistItem';
import {LogDataForUpdateChecklistItem, LogUpdateChecklistItem} from '@copor/checklist/domain/ChecklistItem/logger/LogUpdateChecklistItem';
import {SaveChecklistItemDTO} from '@copor/checklist/domain/Checklist/interactor/dto/SaveChecklistItemDTO';
import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';

export class UpdateChecklistItemController extends UpdateBaseController<UpdateChecklistItemReqBodyDTO> {
	protected getValidator(): Validator {
		const validatorPermissionRepo = this.container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = this.container.getNewRepoPicker(
			UpdateChecklistItemValidatorStorageRepoPicker
		);

		return this.container.getValidator(
			ValidateUpdateChecklistItem,
			this.getValidatorInput(),
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor() {
		return this.container.getInteractor(
			UpdateChecklistItem,
			this.container.getNewRepoPicker(UpdateChecklistItemInteractorRepoPicker),
			this.getValidatorInput()
		);
	}

	protected getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(UpdateChecklistItemLoggerRepoPicker);
		const logData: LogDataForUpdateChecklistItem = this.request.body;

		return this.container.getLogger(
			LogUpdateChecklistItem,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getValidatorInput(): SaveChecklistItemDTO {
		return {
			... this.request.body,
			actorId: this.actorId
		};
	}
}
