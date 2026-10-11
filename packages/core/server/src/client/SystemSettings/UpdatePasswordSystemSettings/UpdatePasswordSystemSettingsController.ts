import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateUpdateSystemSettings} from '@copor/core/domain/SystemSettings/validation/ValidateUpdateSystemSettings';
import {UpdateSystemSettings} from '@copor/core/domain/SystemSettings/interactor/UpdateSystemSettings';
import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {SaveSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/SaveSystemSettingsDTO';
import {SavePasswordSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/SavePasswordSystemSettingsDTO';
import {
	UpdatePasswordSystemSettingsReqBodyDTO
} from '@copor/core/client/SystemSettings/UpdatePasswordSystemSettings/dto/UpdatePasswordSystemSettingsReqBodyDTO';
import {
	UpdateSystemSettingsInteractorRepoPicker
} from '@copor/core/client/SystemSettings/UpdateSystemSettings/repo/repoPicker/UpdateSystemSettingsInteractorRepoPicker';
import {
	UpdatePasswordSystemSettingsLoggerRepoPicker
} from '@copor/core/client/SystemSettings/UpdatePasswordSystemSettings/repo/repoPicker/UpdatePasswordSystemSettingsLoggerRepoPicker';
import {
	LogDataForUpdatePasswordSystemSettings,
	LogUpdatePasswordSystemSettings
} from '@copor/core/domain/SystemSettings/logger/LogUpdatePasswordSystemSettings';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {
	UpdateSystemSettingsValidatorStorageRepoPicker
} from '@copor/core/client/SystemSettings/UpdateSystemSettings/repo/repoPicker/UpdateSystemSettingsValidatorStorageRepoPicker';

export class UpdatePasswordSystemSettingsController extends UpdateBaseController<UpdatePasswordSystemSettingsReqBodyDTO> {
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
			UpdateSystemSettings<SavePasswordSystemSettingsDTO>,
			this.container.getNewRepoPicker(UpdateSystemSettingsInteractorRepoPicker),
			this.getInteractorInput()
		);
	}

	protected getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(UpdatePasswordSystemSettingsLoggerRepoPicker);
		const logData: LogDataForUpdatePasswordSystemSettings = this.request.body;

		return this.container.getLogger(
			LogUpdatePasswordSystemSettings,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getInteractorInput(): SaveSystemSettingsDTO<SavePasswordSystemSettingsDTO> {
		const reqBody = this.request.body;
		const settings: SavePasswordSystemSettingsDTO = {
			minPasswordLength: reqBody.minPasswordLength,
			maxPasswordLength: reqBody.maxPasswordLength,
			minLowercaseLetters: reqBody.minLowercaseLetters,
			minUppercaseLetters: reqBody.minUppercaseLetters,
			minDigits: reqBody.minDigits,
			minSpecialCharacters: reqBody.minSpecialCharacters,
			allowSpaces: reqBody.allowSpaces,
			disallowUsernameInPassword: reqBody.disallowUsernameInPassword,
			disallowEmailOrNameInPassword: reqBody.disallowEmailOrNameInPassword,
			blockCommonPasswords: reqBody.blockCommonPasswords,
			maxRepeatedCharacters: reqBody.maxRepeatedCharacters,
			passwordHistoryCount: reqBody.passwordHistoryCount,
			commonPasswords: reqBody.commonPasswords
		};

		return {settings: settings, type: SystemSettingsType.PASSWORD};
	}
}
