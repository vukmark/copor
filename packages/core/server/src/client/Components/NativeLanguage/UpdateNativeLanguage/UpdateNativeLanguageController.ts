import {UpdateNativeLanguageReqBodyDTO} from './dto/UpdateNativeLanguageReqBodyDTO';
import {UpdateNativeLanguageValidatorStorageRepoPicker} from './repo/repoPicker/UpdateNativeLanguageValidatorStorageRepoPicker';
import {SaveNativeLanguageDTO} from '@copor/core/domain/Components/NativeLanguage/interactor/dto/SaveNativeLanguageDTO';
import {ValidateUpdateNativeLanguage} from '@copor/core/domain/Components/NativeLanguage/validations/ValidateUpdateNativeLanguage';
import {UpdateNativeLanguageInteractorRepoPicker} from './repo/repoPicker/UpdateNativeLanguageInteractorRepoPicker';
import {UpdateNativeLanguage} from '@copor/core/domain/Components/NativeLanguage/interactor/UpdateNativeLanguage';
import {UpdateNativeLanguageLoggerRepoPicker} from './repo/repoPicker/UpdateNativeLanguageLoggerRepoPicker';
import {
	LogDataForUpdateNativeLanguage, LogUpdateNativeLanguage
} from '@copor/core/domain/Components/NativeLanguage/logger/LogUpdateNativeLanguage';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';

export class UpdateNativeLanguageController extends UpdateBaseController<UpdateNativeLanguageReqBodyDTO> {
	protected getValidator(): Validator {
		const validatorPermissionRepo = this.container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = this.container.getNewRepoPicker(
			UpdateNativeLanguageValidatorStorageRepoPicker
		);

		return this.container.getValidator(
			ValidateUpdateNativeLanguage,
			this.getValidatorInput(),
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor() {
		return this.container.getInteractor(
			UpdateNativeLanguage,
			this.container.getNewRepoPicker(UpdateNativeLanguageInteractorRepoPicker),
			this.getValidatorInput()
		);
	}

	protected getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(UpdateNativeLanguageLoggerRepoPicker);
		const logData: LogDataForUpdateNativeLanguage = {
			... this.request.body,
			actorId: this.actorId
		};

		return this.container.getLogger(
			LogUpdateNativeLanguage,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getValidatorInput(): SaveNativeLanguageDTO {
		return {
			... this.request.body,
			actorId: this.actorId
		};
	}
}
