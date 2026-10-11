import {DeleteBaseController} from '@copor/core/client/Core/Controller/DeleteBaseController';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateDeleteAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/validations/dto/ValidateDeleteAiContextItemDTO';
import {ValidateDeleteAiContextItem} from '@copor/ai_context_item/domain/AiContextItem/validations/ValidateDeleteAiContextItem';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	DeleteAiContextItemValidatorStorageRepoPicker
} from '@copor/ai_context_item/client/AiContextItem/DeleteAiContextItem/repo/repoPicker/DeleteAiContextItemValidatorStorageRepoPicker';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {
	DeleteAiContextItemInteractorRepoPicker
} from '@copor/ai_context_item/client/AiContextItem/DeleteAiContextItem/repo/repoPicker/DeleteAiContextItemInteractorRepoPicker';
import {DeleteAiContextItem} from '@copor/ai_context_item/domain/AiContextItem/interactor/DeleteAiContextItem';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {LogDeleteAiContextItem} from '@copor/ai_context_item/domain/AiContextItem/logger/LogDeleteAiContextItem';
import {
	DeleteAiContextItemLoggerRepoPicker
} from '@copor/ai_context_item/client/AiContextItem/DeleteAiContextItem/repo/repoPicker/DeleteAiContextItemLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';

export interface DeleteAiContextItemParams {
	id: string;
}

export class DeleteAiContextItemController extends DeleteBaseController<DeleteAiContextItemParams> {
	protected getValidator(id: string): Validator {
		const container = this.container;
		const input: ValidateDeleteAiContextItemDTO = {
			actorId: this.actorId,
			aiContextItemId: id
		};

		return container.getValidator(
			ValidateDeleteAiContextItem,
			input,
			container.getNewRepoPicker(PermissionValidatorRepoPicker),
			container.getNewRepoPicker(DeleteAiContextItemValidatorStorageRepoPicker)
		);
	}

	protected getInteractor(id: string): UseCase<void> {
		const container = this.container;
		const repo = container.getNewRepoPicker(DeleteAiContextItemInteractorRepoPicker);

		return container.getInteractor(DeleteAiContextItem, repo, id);
	}

	protected getLogger(id: string): LogAction {
		return this.container.getLogger(
			LogDeleteAiContextItem,
			this.container.getNewRepoPicker(DeleteAiContextItemLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{
				aiContextItemId: id
			}
		);
	}
}