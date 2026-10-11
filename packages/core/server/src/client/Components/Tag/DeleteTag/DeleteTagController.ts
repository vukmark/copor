import {DeleteTagValidatorStorageRepoPicker} from './repo/repoPicker/DeleteTagValidatorStorageRepoPicker';
import {DeleteTagInteractorRepoPicker} from './repo/repoPicker/DeleteTagInteractorRepoPicker';
import {DeleteTagLoggerRepoPicker} from './repo/repoPicker/DeleteTagLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {ValidateDeleteTagDTO} from '@copor/core/domain/Components/Tag/validation/dto/ValidateDeleteTagDTO';
import {ValidateDeleteTag} from '@copor/core/domain/Components/Tag/validation/ValidateDeleteTag';
import {DeleteTag} from '@copor/core/domain/Components/Tag/interactor/DeleteTag';
import {LogDeleteTag} from '@copor/core/domain/Components/Tag/logger/LogDeleteTag';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {DeleteBaseController} from '@copor/core/client/Core/Controller/DeleteBaseController';

export interface DeleteTagParams {
	id: string;
}

export class DeleteTagController extends DeleteBaseController<DeleteTagParams> {
	protected getValidator(id: string) : Validator {
		const c = this.container;
		const input: ValidateDeleteTagDTO = {
			actorId: this.actorId,
			tagId: id
		};

		return c.getValidator(
			ValidateDeleteTag,
			input,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(DeleteTagValidatorStorageRepoPicker)
		);
	}

	protected getInteractor(id: string) : UseCase<void> {
		const c = this.container;
		const repo = c.getNewRepoPicker(DeleteTagInteractorRepoPicker);

		return c.getInteractor(DeleteTag, repo, id);
	}

	protected getLogger(id: string) : LogAction {
		return this.container.getLogger(
			LogDeleteTag,
			this.container.getNewRepoPicker(DeleteTagLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{tagId: id}
		);
	}
}
