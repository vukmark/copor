import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateUpdateSystemSettings} from '@copor/core/domain/SystemSettings/validation/ValidateUpdateSystemSettings';
import {UpdateSystemSettings} from '@copor/core/domain/SystemSettings/interactor/UpdateSystemSettings';
import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {SaveSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/SaveSystemSettingsDTO';
import {SaveGlobalSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/SaveGlobalSystemSettingsDTO';
import {
	UpdateGlobalSystemSettingsReqBodyDTO
} from '@copor/core/client/SystemSettings/UpdateGlobalSystemSettings/dto/UpdateGlobalSystemSettingsReqBodyDTO';
import {
	UpdateSystemSettingsInteractorRepoPicker
} from '@copor/core/client/SystemSettings/UpdateSystemSettings/repo/repoPicker/UpdateSystemSettingsInteractorRepoPicker';
import {
	UpdateSystemSettingsValidatorStorageRepoPicker
} from '@copor/core/client/SystemSettings/UpdateSystemSettings/repo/repoPicker/UpdateSystemSettingsValidatorStorageRepoPicker';
import {
	UpdateGlobalSystemSettingsLoggerRepoPicker
} from '@copor/core/client/SystemSettings/UpdateGlobalSystemSettings/repo/repoPicker/UpdateGlobalSystemSettingsLoggerRepoPicker';
import {
	LogDataForUpdateGlobalSystemSettings,
	LogUpdateGlobalSystemSettings
} from '@copor/core/domain/SystemSettings/logger/LogUpdateGlobalSystemSettings';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';

export class UpdateGlobalSystemSettingsController extends UpdateBaseController<UpdateGlobalSystemSettingsReqBodyDTO> {
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
			UpdateSystemSettings<SaveGlobalSystemSettingsDTO>,
			this.container.getNewRepoPicker(UpdateSystemSettingsInteractorRepoPicker),
			this.getInteractorInput()
		);
	}

	protected getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(UpdateGlobalSystemSettingsLoggerRepoPicker);
		const logData: LogDataForUpdateGlobalSystemSettings
			= this.request.body;

		return this.container.getLogger(
			LogUpdateGlobalSystemSettings,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getInteractorInput(): SaveSystemSettingsDTO<SaveGlobalSystemSettingsDTO> {
		const b = this.request.body;
		const settings: SaveGlobalSystemSettingsDTO = {
			name: b.name,
			postalCode: b.postalCode,
			allowSelfRegistration: b.allowSelfRegistration === true
		};

		return {settings: settings, type: SystemSettingsType.GLOBAL};
	}
}
