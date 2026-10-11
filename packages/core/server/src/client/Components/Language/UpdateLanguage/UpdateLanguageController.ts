import {UpdateLanguageReqBodyDTO} from './dto/UpdateLanguageReqBodyDTO';
import {UpdateLanguageValidatorStorageRepoPicker} from './repo/repoPicker/UpdateLanguageValidatorStorageRepoPicker';
import {SaveLanguageDTO} from '@copor/core/domain/Components/Language/interactor/dto/SaveLanguageDTO';
import {ValidateUpdateLanguage} from '@copor/core/domain/Components/Language/validations/ValidateUpdateLanguage';
import {UpdateLanguageInteractorRepoPicker} from './repo/repoPicker/UpdateLanguageInteractorRepoPicker';
import {UpdateLanguage} from '@copor/core/domain/Components/Language/interactor/UpdateLanguage';
import {UpdateLanguageLoggerRepoPicker} from './repo/repoPicker/UpdateLanguageLoggerRepoPicker';
import {
	LogDataForUpdateLanguage, LogUpdateLanguage
} from '@copor/core/domain/Components/Language/logger/LogUpdateLanguage';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';

export class UpdateLanguageController extends UpdateBaseController<UpdateLanguageReqBodyDTO> {
	protected getValidator(): Validator {
		const validatorPermissionRepo = this.container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = this.container.getNewRepoPicker(
			UpdateLanguageValidatorStorageRepoPicker
		);

		return this.container.getValidator(
			ValidateUpdateLanguage,
			this.getValidatorInput(),
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor() {
		return this.container.getInteractor(
			UpdateLanguage,
			this.container.getNewRepoPicker(UpdateLanguageInteractorRepoPicker),
			this.getValidatorInput()
		);
	}

	protected getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(UpdateLanguageLoggerRepoPicker);
		const logData: LogDataForUpdateLanguage = {
			... this.request.body,
			actorId: this.actorId
		};

		return this.container.getLogger(
			LogUpdateLanguage,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getValidatorInput(): SaveLanguageDTO {
		return {
			... this.request.body,
			actorId: this.actorId
		};
	}
}
