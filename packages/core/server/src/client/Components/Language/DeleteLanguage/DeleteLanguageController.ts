import {ValidateDeleteLanguageDTO} from '@copor/core/domain/Components/Language/validations/dto/ValidateDeleteLanguageDTO';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {DeleteLanguageValidatorStorageRepoPicker} from './repo/repoPicker/DeleteLanguageValidatorStorageRepoPicker';
import {ValidateDeleteLanguage} from '@copor/core/domain/Components/Language/validations/ValidateDeleteLanguage';
import {DeleteLanguageInteractorRepoPicker} from './repo/repoPicker/DeleteLanguageInteractorRepoPicker';
import {DeleteLanguage} from '@copor/core/domain/Components/Language/interactor/DeleteLanguage';
import {LogDeleteLanguage} from '@copor/core/domain/Components/Language/logger/LogDeleteLanguage';
import {DeleteLanguageLoggerRepoPicker} from './repo/repoPicker/DeleteLanguageLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {DeleteBaseController} from '@copor/core/client/Core/Controller/DeleteBaseController';

export interface DeleteLanguageParams {
	id: string;
}

export class DeleteLanguageController extends DeleteBaseController<DeleteLanguageParams> {
	protected getValidator(id: string) : Validator {
		const c = this.container;
		const input: ValidateDeleteLanguageDTO = {
			actorId: this.actorId,
			languageId: id
		};

		return c.getValidator(
			ValidateDeleteLanguage,
			input,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(DeleteLanguageValidatorStorageRepoPicker)
		);
	}

	protected getInteractor(id: string) : UseCase<void> {
		const c = this.container;
		const repo = c.getNewRepoPicker(DeleteLanguageInteractorRepoPicker);

		return c.getInteractor(DeleteLanguage, repo, id);
	}

	protected getLogger(id: string) : LogAction {
		return this.container.getLogger(
			LogDeleteLanguage,
			this.container.getNewRepoPicker(DeleteLanguageLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{languageId: id}
		);
	}
}
