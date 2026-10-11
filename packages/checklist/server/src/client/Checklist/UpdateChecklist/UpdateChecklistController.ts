import {UpdateChecklistReqBodyDTO} from './dto/UpdateChecklistReqBodyDTO';
import {UpdateChecklistValidatorStorageRepoPicker} from './repo/repoPicker/UpdateChecklistValidatorStorageRepoPicker';
import {SaveChecklistDTO} from '@copor/checklist/domain/Checklist/interactor/dto/SaveChecklistDTO';
import {UpdateChecklistInteractorRepoPicker} from './repo/repoPicker/UpdateChecklistInteractorRepoPicker';
import {UpdateChecklist} from '@copor/checklist/domain/Checklist/interactor/UpdateChecklist';
import {UpdateChecklistLoggerRepoPicker} from './repo/repoPicker/UpdateChecklistLoggerRepoPicker';
import {
	LogDataForUpdateChecklist, LogUpdateChecklist
} from '@copor/checklist/domain/Checklist/logger/LogUpdateChecklist';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateUpdateChecklist} from '@copor/checklist/domain/Checklist/validations/ValidateUpdateChecklist';
import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';

export class UpdateChecklistController extends UpdateBaseController<UpdateChecklistReqBodyDTO> {
	protected getValidator(): Validator {
		const validatorPermissionRepo = this.container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = this.container.getNewRepoPicker(
			UpdateChecklistValidatorStorageRepoPicker
		);

		return this.container.getValidator(
			ValidateUpdateChecklist,
			this.getValidatorInput(),
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor() {
		return this.container.getInteractor(
			UpdateChecklist,
			this.container.getNewRepoPicker(UpdateChecklistInteractorRepoPicker),
			this.getValidatorInput()
		);
	}

	protected getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(UpdateChecklistLoggerRepoPicker);
		const logData: LogDataForUpdateChecklist = this.request.body;

		return this.container.getLogger(
			LogUpdateChecklist,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getValidatorInput(): SaveChecklistDTO {
		return {
			... this.request.body,
			actorId: this.actorId
		};
	}
}
