import {UpdateUserPreferencesReqBodyDTO} from './dto/UpdateUserPreferencesReqBodyDTO';
import {UpdateUserPreferencesValidatorStorageRepoPicker} from './repo/repoPicker/UpdateUserPreferencesValidatorStorageRepoPicker';
import {SaveUserPreferencesDTO} from '@copor/core/domain/User/UserPreferences/interactor/dto/SaveUserPreferencesDTO';
import {ValidateUpdateUserPreferences} from '@copor/core/domain/User/UserPreferences/validations/ValidateUpdateUserPreferences';
import {UpdateUserPreferencesInteractorRepoPicker} from './repo/repoPicker/UpdateUserPreferencesInteractorRepoPicker';
import {UpdateUserPreferences} from '@copor/core/domain/User/UserPreferences/interactor/UpdateUserPreferences';
import {UpdateUserPreferencesLoggerRepoPicker} from './repo/repoPicker/UpdateUserPreferencesLoggerRepoPicker';
import {LogDataForUpdateUserPreferences, LogUpdateUserPreferences}
	from '@copor/core/domain/User/UserPreferences/logger/LogUpdateUserPreferences';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';

export class UpdateUserPreferencesController extends UpdateBaseController<UpdateUserPreferencesReqBodyDTO> {
	protected getValidator(): Validator {
		const validatorPermissionRepo = this.container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = this.container.getNewRepoPicker(
			UpdateUserPreferencesValidatorStorageRepoPicker
		);

		return this.container.getValidator(
			ValidateUpdateUserPreferences,
			this.getValidatorInput(),
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor() {
		return this.container.getInteractor(
			UpdateUserPreferences,
			this.container.getNewRepoPicker(UpdateUserPreferencesInteractorRepoPicker),
			this.getValidatorInput()
		);
	}

	protected getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(UpdateUserPreferencesLoggerRepoPicker);
		const logData: LogDataForUpdateUserPreferences = this.request.body;

		return this.container.getLogger(
			LogUpdateUserPreferences,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getValidatorInput(): SaveUserPreferencesDTO {
		return {
			... this.request.body,
			user: this.actorId
		};
	}
}
