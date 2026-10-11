import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateUpdateSystemSettings} from '@copor/core/domain/SystemSettings/validation/ValidateUpdateSystemSettings';
import {UpdateSystemSettings} from '@copor/core/domain/SystemSettings/interactor/UpdateSystemSettings';
import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {SaveSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/SaveSystemSettingsDTO';
import {SaveNotifierSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/SaveNotifierSystemSettingsDTO';
import {
	UpdateNotifierSystemSettingsReqBodyDTO
} from '@copor/core/client/SystemSettings/UpdateNotifierSystemSettings/dto/UpdateNotifierSystemSettingsReqBodyDTO';
import {
	UpdateSystemSettingsInteractorRepoPicker
} from '@copor/core/client/SystemSettings/UpdateSystemSettings/repo/repoPicker/UpdateSystemSettingsInteractorRepoPicker';
import {
	UpdateNotifierSystemSettingsLoggerRepoPicker
} from '@copor/core/client/SystemSettings/UpdateNotifierSystemSettings/repo/repoPicker/UpdateNotifierSystemSettingsLoggerRepoPicker';
import {
	LogDataForUpdateNotifierSystemSettings,
	LogUpdateNotifierSystemSettings
} from '@copor/core/domain/SystemSettings/logger/LogUpdateNotifierSystemSettings';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {
	UpdateSystemSettingsValidatorStorageRepoPicker
} from '@copor/core/client/SystemSettings/UpdateSystemSettings/repo/repoPicker/UpdateSystemSettingsValidatorStorageRepoPicker';

export class UpdateNotifierSystemSettingsController extends UpdateBaseController<UpdateNotifierSystemSettingsReqBodyDTO> {
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
			UpdateSystemSettings<SaveNotifierSystemSettingsDTO>,
			this.container.getNewRepoPicker(UpdateSystemSettingsInteractorRepoPicker),
			this.getInteractorInput()
		);
	}

	protected getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(UpdateNotifierSystemSettingsLoggerRepoPicker);
		const logData: LogDataForUpdateNotifierSystemSettings = this.request.body;

		return this.container.getLogger(
			LogUpdateNotifierSystemSettings,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getInteractorInput(): SaveSystemSettingsDTO<SaveNotifierSystemSettingsDTO> {
		const b = this.request.body;
		const settings: SaveNotifierSystemSettingsDTO = {
			enabled: b.enabled
		};

		return {settings: settings, type: SystemSettingsType.NOTIFIER};
	}
}
