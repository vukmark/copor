import {
	CreateChecklistItemReqBodyDTO
} from '@copor/checklist/client/ChecklistItem/CreateChecklistItem/dto/CreateChecklistItemReqBodyDTO';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';

import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	CreateChecklistItemValidatorStorageRepoPicker
} from '@copor/checklist/client/ChecklistItem/CreateChecklistItem/repo/repoPicker/CreateChecklistItemValidatorStorageRepoPicker';
import {
	CreateChecklistItemInteractorRepoPicker
} from '@copor/checklist/client/ChecklistItem/CreateChecklistItem/repo/repoPicker/CreateChecklistItemInteractorRepoPicker';
import {
	CreateChecklistItemLoggerRepoPicker
} from '@copor/checklist/client/ChecklistItem/CreateChecklistItem/repo/repoPicker/CreateChecklistItemLoggerRepoPicker';
import {ValidateCreateChecklistItemDTO} from '@copor/checklist/domain/ChecklistItem/validations/dto/ValidateCreateChecklistItemDTO';
import {ValidateCreateChecklistItem} from '@copor/checklist/domain/ChecklistItem/validations/ValidateCreateChecklistItem';
import {SaveChecklistItemDTO} from '@copor/checklist/domain/Checklist/interactor/dto/SaveChecklistItemDTO';
import {LogCreateChecklistItem, LogDataForCreateChecklistItem} from '@copor/checklist/domain/ChecklistItem/logger/LogCreateChecklistItem';
import {CreateChecklistItem} from '@copor/checklist/domain/ChecklistItem/interactor/CreateChecklistItem';
import {CreateBaseController} from '@copor/core/client/Core/Controller/CreateBaseController';

export class CreateChecklistItemController extends CreateBaseController<CreateChecklistItemReqBodyDTO> {
	protected getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = container.getNewRepoPicker(CreateChecklistItemValidatorStorageRepoPicker);
		const validatorInput: ValidateCreateChecklistItemDTO = {
			... this.request.body,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateCreateChecklistItem,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor(uniqueId: string) : UseCase<string> {
		const container = this.container;
		const interactorInput: SaveChecklistItemDTO = {
			... this.request.body,
			actorId: this.actorId,
			id: uniqueId
		};
		const interactorRepo = container.getNewRepoPicker(CreateChecklistItemInteractorRepoPicker);

		return container.getInteractor(
			CreateChecklistItem,
			interactorRepo,
			interactorInput
		);
	}

	protected getLogger(uniqueId: string) : LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(CreateChecklistItemLoggerRepoPicker);
		const logData = this.getLogData(uniqueId);

		return container.getLogger(
			LogCreateChecklistItem,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getLogData(uniqueId: string): LogDataForCreateChecklistItem {
		return {
			... this.request.body,
			id: uniqueId
		};
	}
}
