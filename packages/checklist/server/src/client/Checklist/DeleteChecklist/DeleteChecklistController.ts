import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	DeleteChecklistValidatorStorageRepoPicker
} from '@copor/checklist/client/Checklist/DeleteChecklist/repo/repoPicker/DeleteChecklistValidatorStorageRepoPicker';
import {ValidateDeleteChecklistDTO} from '@copor/checklist/domain/Checklist/validations/dto/ValidateDeleteChecklistDTO';
import {ValidateDeleteChecklist} from '@copor/checklist/domain/Checklist/validations/ValidateDeleteChecklist';
import {
	DeleteChecklistInteractorRepoPicker
} from '@copor/checklist/client/Checklist/DeleteChecklist/repo/repoPicker/DeleteChecklistInteractorRepoPicker';
import {DeleteChecklist} from '@copor/checklist/domain/Checklist/interactor/DeleteChecklist';
import {
	DeleteChecklistLoggerRepoPicker
} from '@copor/checklist/client/Checklist/DeleteChecklist/repo/repoPicker/DeleteChecklistLoggerRepoPicker';
import {LogDeleteChecklist} from '@copor/checklist/domain/Checklist/logger/LogDeleteChecklist';
import {DeleteBaseController} from '@copor/core/client/Core/Controller/DeleteBaseController';

export interface DeleteChecklistParams {
	id: string;
}

export class DeleteChecklistController extends DeleteBaseController<DeleteChecklistParams> {

	protected getValidator(id: string) : Validator {
		const container = this.container;
		const input: ValidateDeleteChecklistDTO = {
			checklistId: id,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateDeleteChecklist,
			input,
			container.getNewRepoPicker(PermissionValidatorRepoPicker),
			container.getNewRepoPicker(DeleteChecklistValidatorStorageRepoPicker)
		);
	}

	protected getInteractor(id: string) : UseCase<void> {
		const container = this.container;
		const repo = container.getNewRepoPicker(DeleteChecklistInteractorRepoPicker);

		return container.getInteractor(DeleteChecklist, repo, id);
	}

	protected getLogger(id: string) : LogAction {
		return this.container.getLogger(
			LogDeleteChecklist,
			this.container.getNewRepoPicker(DeleteChecklistLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{deleteChecklistId: id}
		);
	}
}
