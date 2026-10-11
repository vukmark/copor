import {DeleteBaseController} from '@copor/core/client/Core/Controller/DeleteBaseController';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {ValidateDeleteContentItemDTO} from '@copor/core/domain/ContentItem/validations/dto/ValidateDeleteContentItemDTO';
import {
	DeleteContentItemValidatorStorageRepoPicker
} from '@copor/core/client/ContentItem/DeleteContentItem/repo/repoPicker/DeleteContentItemValidatorStorageRepoPicker';
import {ValidateDeleteContentItem} from '@copor/core/domain/ContentItem/validations/ValidateDeleteContentItem';
import {
	DeleteContentItemLoggerRepoPicker
} from '@copor/core/client/ContentItem/DeleteContentItem/repo/repoPicker/DeleteContentItemLoggerRepoPicker';
import {
	DeleteContentItemInteractorRepoPicker
} from '@copor/core/client/ContentItem/DeleteContentItem/repo/repoPicker/DeleteContentItemInteractorRepoPicker';
import {DeleteContentItem} from '@copor/core/domain/ContentItem/interactor/DeleteContentItem';
import {LogDeleteContentItem} from '@copor/core/domain/ContentItem/logger/LogDeleteContentItem';

export interface DeleteContentItemParams {
	id: string;
}

export class DeleteContentItemController extends DeleteBaseController<DeleteContentItemParams> {
	protected getValidator(id: string): Validator {
		const container = this.container;
		const input: ValidateDeleteContentItemDTO = {
			contentItemId: id,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateDeleteContentItem,
			input,
			container.getNewRepoPicker(PermissionValidatorRepoPicker),
			container.getNewRepoPicker(DeleteContentItemValidatorStorageRepoPicker)
		);
	}

	protected getInteractor(id: string): UseCase<void> {
		const container = this.container;
		const repo = container.getNewRepoPicker(DeleteContentItemInteractorRepoPicker);

		return container.getInteractor(DeleteContentItem, repo, id);
	}

	protected getLogger(id: string): LogAction {
		return this.container.getLogger(
			LogDeleteContentItem,
			this.container.getNewRepoPicker(DeleteContentItemLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{contentItemId: id}
		);
	}
}