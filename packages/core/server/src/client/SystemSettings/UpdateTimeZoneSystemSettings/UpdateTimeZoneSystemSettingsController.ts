import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateUpdateSystemSettings} from '@copor/core/domain/SystemSettings/validation/ValidateUpdateSystemSettings';
import {UpdateSystemSettings} from '@copor/core/domain/SystemSettings/interactor/UpdateSystemSettings';
import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {SaveSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/SaveSystemSettingsDTO';
import {SaveTimeZoneSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/SaveTimeZoneSystemSettingsDTO';
import {
	UpdateTimeZoneSystemSettingsReqBodyDTO
} from '@copor/core/client/SystemSettings/UpdateTimeZoneSystemSettings/dto/UpdateTimeZoneSystemSettingsReqBodyDTO';
import {
	UpdateSystemSettingsInteractorRepoPicker
} from '@copor/core/client/SystemSettings/UpdateSystemSettings/repo/repoPicker/UpdateSystemSettingsInteractorRepoPicker';
import {
	UpdateTimeZoneSystemSettingsValidatorStorageRepoPicker
} from '@copor/core/client/SystemSettings/UpdateTimeZoneSystemSettings/repo/repoPicker/UpdateTimeZoneSystemSettingsValidatorStorageRepoPicker';
import {
	UpdateTimeZoneSystemSettingsLoggerRepoPicker
} from '@copor/core/client/SystemSettings/UpdateTimeZoneSystemSettings/repo/repoPicker/UpdateTimeZoneSystemSettingsLoggerRepoPicker';
import {
	LogDataForUpdateTimeZoneSystemSettings,
	LogUpdateTimeZoneSystemSettings
} from '@copor/core/domain/SystemSettings/logger/LogUpdateTimeZoneSystemSettings';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';

export class UpdateTimeZoneSystemSettingsController extends UpdateBaseController<UpdateTimeZoneSystemSettingsReqBodyDTO> {
	protected getValidator(): Validator {
		const validatorPermissionRepo = this.container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = this.container.getNewRepoPicker(
			UpdateTimeZoneSystemSettingsValidatorStorageRepoPicker
		);

		return this.container.getValidator(
			ValidateUpdateSystemSettings,
			{actorId: this.actorId, timeZone: this.request.body.timeZone},
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor() {
		return this.container.getInteractor(
			UpdateSystemSettings<SaveTimeZoneSystemSettingsDTO>,
			this.container.getNewRepoPicker(UpdateSystemSettingsInteractorRepoPicker),
			this.getInteractorInput()
		);
	}

	protected getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(UpdateTimeZoneSystemSettingsLoggerRepoPicker);
		const logData: LogDataForUpdateTimeZoneSystemSettings
			= this.request.body;

		return this.container.getLogger(
			LogUpdateTimeZoneSystemSettings,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getInteractorInput(): SaveSystemSettingsDTO<SaveTimeZoneSystemSettingsDTO> {
		const b = this.request.body;
		const settings: SaveTimeZoneSystemSettingsDTO = {
			timeZone: b.timeZone
		};

		return {settings: settings, type: SystemSettingsType.TIME_ZONE};
	}
}
