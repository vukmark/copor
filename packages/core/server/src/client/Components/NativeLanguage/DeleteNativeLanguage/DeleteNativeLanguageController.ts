import {ValidateDeleteNativeLanguageDTO} from '@copor/core/domain/Components/NativeLanguage/validations/dto/ValidateDeleteNativeLanguageDTO';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {DeleteNativeLanguageValidatorStorageRepoPicker} from './repo/repoPicker/DeleteNativeLanguageValidatorStorageRepoPicker';
import {ValidateDeleteNativeLanguage} from '@copor/core/domain/Components/NativeLanguage/validations/ValidateDeleteNativeLanguage';
import {DeleteNativeLanguageInteractorRepoPicker} from './repo/repoPicker/DeleteNativeLanguageInteractorRepoPicker';
import {DeleteNativeLanguage} from '@copor/core/domain/Components/NativeLanguage/interactor/DeleteNativeLanguage';
import {LogDeleteNativeLanguage} from '@copor/core/domain/Components/NativeLanguage/logger/LogDeleteNativeLanguage';
import {DeleteNativeLanguageLoggerRepoPicker} from './repo/repoPicker/DeleteNativeLanguageLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {DeleteBaseController} from '@copor/core/client/Core/Controller/DeleteBaseController';

export interface DeleteNativeLanguageParams {
	id: string;
}

export class DeleteNativeLanguageController extends DeleteBaseController<DeleteNativeLanguageParams> {
	protected getValidator(id: string) : Validator {
		const c = this.container;
		const input: ValidateDeleteNativeLanguageDTO = {
			actorId: this.actorId,
			languageId: id
		};

		return c.getValidator(
			ValidateDeleteNativeLanguage,
			input,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(DeleteNativeLanguageValidatorStorageRepoPicker)
		);
	}

	protected getInteractor(id: string) : UseCase<void> {
		const c = this.container;
		const repo = c.getNewRepoPicker(DeleteNativeLanguageInteractorRepoPicker);

		return c.getInteractor(DeleteNativeLanguage, repo, id);
	}

	protected getLogger(id: string) : LogAction {
		return this.container.getLogger(
			LogDeleteNativeLanguage,
			this.container.getNewRepoPicker(DeleteNativeLanguageLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{languageId: id}
		);
	}
}
