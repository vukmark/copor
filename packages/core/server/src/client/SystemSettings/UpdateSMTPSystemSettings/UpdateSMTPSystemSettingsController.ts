import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateUpdateSystemSettings} from '@copor/core/domain/SystemSettings/validation/ValidateUpdateSystemSettings';
import {UpdateSystemSettings} from '@copor/core/domain/SystemSettings/interactor/UpdateSystemSettings';
import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {SaveSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/SaveSystemSettingsDTO';
import {
	UpdateSystemSettingsInteractorRepoPicker
} from '@copor/core/client/SystemSettings/UpdateSystemSettings/repo/repoPicker/UpdateSystemSettingsInteractorRepoPicker';
import {
	UpdateSMTPSystemSettingsLoggerRepoPicker
} from '@copor/core/client/SystemSettings/UpdateSMTPSystemSettings/repo/repoPicker/UpdateSMTPSystemSettingsLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {
	LogDataForUpdateSMTPSystemSettings,
	LogUpdateSMTPSystemSettings
} from '@copor/core/domain/SystemSettings/logger/LogUpdateSMTPSystemSettings';
import {
	UpdateSMTPSystemSettingsReqBodyDTO
} from '@copor/core/client/SystemSettings/UpdateSMTPSystemSettings/dto/UpdateSMTPSystemSettingsReqBodyDTO';
import {SaveSMTPSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/SaveSMTPSystemSettingsDTO';
import {
	UpdateSystemSettingsValidatorStorageRepoPicker
} from '@copor/core/client/SystemSettings/UpdateSystemSettings/repo/repoPicker/UpdateSystemSettingsValidatorStorageRepoPicker';

export class UpdateSMTPSystemSettingsController extends UpdateBaseController<UpdateSMTPSystemSettingsReqBodyDTO> {
	protected getValidator(): Validator {
		const validatorPermissionRepo = this.container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = this.container.getNewRepoPicker(
			UpdateSystemSettingsValidatorStorageRepoPicker
		);

		return this.container.getValidator(
			ValidateUpdateSystemSettings,
			{
				actorId: this.actorId,
				smtpConnectionSecurity: this.request.body.smtpConnectionSecurity,
				smtpAuthMethod: this.request.body.smtpAuthMethod
			},
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor() {
		return this.container.getInteractor(
			UpdateSystemSettings,
			this.container.getNewRepoPicker(UpdateSystemSettingsInteractorRepoPicker),
			this.getInteractorInput()
		);
	}

	protected getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(UpdateSMTPSystemSettingsLoggerRepoPicker);
		const logData: LogDataForUpdateSMTPSystemSettings
			= this.request.body;

		return this.container.getLogger(
			LogUpdateSMTPSystemSettings,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getInteractorInput(): SaveSystemSettingsDTO<SaveSMTPSystemSettingsDTO> {
		return {settings: this.request.body, type: SystemSettingsType.SMTP};
	}
}
