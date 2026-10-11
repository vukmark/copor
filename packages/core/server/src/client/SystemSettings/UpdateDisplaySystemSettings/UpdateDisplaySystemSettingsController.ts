import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateUpdateSystemSettings} from '@copor/core/domain/SystemSettings/validation/ValidateUpdateSystemSettings';
import {UpdateSystemSettings} from '@copor/core/domain/SystemSettings/interactor/UpdateSystemSettings';
import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {SaveSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/SaveSystemSettingsDTO';
import {SaveDisplaySystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/SaveDisplaySystemSettingsDTO';
import {
	UpdateDisplaySystemSettingsReqBodyDTO
} from '@copor/core/client/SystemSettings/UpdateDisplaySystemSettings/dto/UpdateDisplaySystemSettingsReqBodyDTO';
import {
	UpdateSystemSettingsInteractorRepoPicker
} from '@copor/core/client/SystemSettings/UpdateSystemSettings/repo/repoPicker/UpdateSystemSettingsInteractorRepoPicker';
import {
	UpdateDisplaySystemSettingsLoggerRepoPicker
} from '@copor/core/client/SystemSettings/UpdateDisplaySystemSettings/repo/repoPicker/UpdateDisplaySystemSettingsLoggerRepoPicker';
import {
	LogDataForUpdateDisplaySystemSettings,
	LogUpdateDisplaySystemSettings
} from '@copor/core/domain/SystemSettings/logger/LogUpdateDisplaySystemSettings';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {
	UpdateSystemSettingsValidatorStorageRepoPicker
} from '@copor/core/client/SystemSettings/UpdateSystemSettings/repo/repoPicker/UpdateSystemSettingsValidatorStorageRepoPicker';

export class UpdateDisplaySystemSettingsController extends UpdateBaseController<UpdateDisplaySystemSettingsReqBodyDTO> {
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
			UpdateSystemSettings<SaveDisplaySystemSettingsDTO>,
			this.container.getNewRepoPicker(UpdateSystemSettingsInteractorRepoPicker),
			this.getInteractorInput()
		);
	}

	protected getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(UpdateDisplaySystemSettingsLoggerRepoPicker);
		const logData: LogDataForUpdateDisplaySystemSettings
			= this.request.body;

		return this.container.getLogger(
			LogUpdateDisplaySystemSettings,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getInteractorInput(): SaveSystemSettingsDTO<SaveDisplaySystemSettingsDTO> {
		const b = this.request.body;
		const settings: SaveDisplaySystemSettingsDTO = {
			showDetailedErrors: b.showDetailedErrors
		};

		return {settings: settings, type: SystemSettingsType.DISPLAY};
	}
}