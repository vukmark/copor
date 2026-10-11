import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateUpdateSystemSettings} from '@copor/core/domain/SystemSettings/validation/ValidateUpdateSystemSettings';
import {UpdateSystemSettings} from '@copor/core/domain/SystemSettings/interactor/UpdateSystemSettings';
import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {SaveSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/SaveSystemSettingsDTO';
import {SaveWorkflowSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/SaveWorkflowSystemSettingsDTO';
import {
	UpdateWorkflowSystemSettingsReqBodyDTO
} from '@copor/core/client/SystemSettings/UpdateWorkflowSystemSettings/dto/UpdateWorkflowSystemSettingsReqBodyDTO';
import {
	UpdateSystemSettingsInteractorRepoPicker
} from '@copor/core/client/SystemSettings/UpdateSystemSettings/repo/repoPicker/UpdateSystemSettingsInteractorRepoPicker';
import {
	UpdateWorkflowSystemSettingsLoggerRepoPicker
} from '@copor/core/client/SystemSettings/UpdateWorkflowSystemSettings/repo/repoPicker/UpdateWorkflowSystemSettingsLoggerRepoPicker';
import {
	LogDataForUpdateWorkflowSystemSettings,
	LogUpdateWorkflowSystemSettings
} from '@copor/core/domain/SystemSettings/logger/LogUpdateWorkflowSystemSettings';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {
	UpdateSystemSettingsValidatorStorageRepoPicker
} from '@copor/core/client/SystemSettings/UpdateSystemSettings/repo/repoPicker/UpdateSystemSettingsValidatorStorageRepoPicker';

export class UpdateWorkflowSystemSettingsController extends UpdateBaseController<UpdateWorkflowSystemSettingsReqBodyDTO> {
	protected getValidator(): Validator {
		const validatorPermissionRepo = this.container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = this.container.getNewRepoPicker(
			UpdateSystemSettingsValidatorStorageRepoPicker
		);

		return this.container.getValidator(
			ValidateUpdateSystemSettings,
			{actorId: this.actorId},
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor() {
		return this.container.getInteractor(
			UpdateSystemSettings<SaveWorkflowSystemSettingsDTO>,
			this.container.getNewRepoPicker(UpdateSystemSettingsInteractorRepoPicker),
			this.getInteractorInput()
		);
	}

	protected getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(UpdateWorkflowSystemSettingsLoggerRepoPicker);
		const logData: LogDataForUpdateWorkflowSystemSettings
			= this.request.body;

		return this.container.getLogger(
			LogUpdateWorkflowSystemSettings,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getInteractorInput(): SaveSystemSettingsDTO<SaveWorkflowSystemSettingsDTO> {
		const b = this.request.body;
		const settings: SaveWorkflowSystemSettingsDTO = {
			enabled: b.enabled
		};

		return {settings: settings, type: SystemSettingsType.WORKFLOW};
	}
}
