import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	DeleteChecklistItemValidatorStorageRepoPicker
} from '@copor/checklist/client/ChecklistItem/DeleteChecklistItem/repo/repoPicker/DeleteChecklistItemValidatorStorageRepoPicker';
import {
	DeleteChecklistItemInteractorRepoPicker
} from '@copor/checklist/client/ChecklistItem/DeleteChecklistItem/repo/repoPicker/DeleteChecklistItemInteractorRepoPicker';
import {
	DeleteChecklistItemLoggerRepoPicker
} from '@copor/checklist/client/ChecklistItem/DeleteChecklistItem/repo/repoPicker/DeleteChecklistItemLoggerRepoPicker';
import {ValidateDeleteChecklistItemDTO} from '@copor/checklist/domain/ChecklistItem/validations/dto/ValidateDeleteChecklistItemDTO';
import {ValidateDeleteChecklistItem} from '@copor/checklist/domain/ChecklistItem/validations/ValidateDeleteChecklistItem';
import {DeleteChecklistItem} from '@copor/checklist/domain/ChecklistItem/interactor/DeleteChecklistItem';
import {LogDeleteChecklistItem} from '@copor/checklist/domain/ChecklistItem/logger/LogDeleteChecklistItem';
import {DeleteBaseController} from '@copor/core/client/Core/Controller/DeleteBaseController';

export interface DeleteChecklistItemParams {
	id: string;
}

export class DeleteChecklistItemController extends DeleteBaseController<DeleteChecklistItemParams> {

	protected getValidator(id: string) : Validator {
		const container = this.container;
		const input: ValidateDeleteChecklistItemDTO = {
			checklistItemId: id,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateDeleteChecklistItem,
			input,
			container.getNewRepoPicker(PermissionValidatorRepoPicker),
			container.getNewRepoPicker(DeleteChecklistItemValidatorStorageRepoPicker)
		);
	}

	protected getInteractor(id: string) : UseCase<void> {
		const container = this.container;
		const repo = container.getNewRepoPicker(DeleteChecklistItemInteractorRepoPicker);

		return container.getInteractor(DeleteChecklistItem, repo, id);
	}

	protected getLogger(id: string) : LogAction {
		return this.container.getLogger(
			LogDeleteChecklistItem,
			this.container.getNewRepoPicker(DeleteChecklistItemLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{deleteChecklistItemId: id}
		);
	}
}
