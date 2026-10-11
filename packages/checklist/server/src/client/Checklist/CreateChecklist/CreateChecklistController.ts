import {CreateChecklistReqBodyDTO} from '@copor/checklist/client/Checklist/CreateChecklist/dto/CreateChecklistReqBodyDTO';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateCreateChecklistDTO} from '@copor/checklist/domain/Checklist/validations/dto/ValidateCreateChecklistDTO';
import {ValidateCreateChecklist} from '@copor/checklist/domain/Checklist/validations/ValidateCreateChecklist';
import {SaveChecklistDTO} from '@copor/checklist/domain/Checklist/interactor/dto/SaveChecklistDTO';
import {CreateChecklistInteractorRepoPicker}
	from '@copor/checklist/client/Checklist/CreateChecklist/repo/repoPicker/CreateChecklistInteractorRepoPicker';
import {CreateChecklist} from '@copor/checklist/domain/Checklist/interactor/CreateChecklist';
import {CreateChecklistLoggerRepoPicker}
	from '@copor/checklist/client/Checklist/CreateChecklist/repo/repoPicker/CreateChecklistLoggerRepoPicker';
import {LogCreateChecklist, LogDataForCreateChecklist} from '@copor/checklist/domain/Checklist/logger/LogCreateChecklist';
import {CreateBaseController} from '@copor/core/client/Core/Controller/CreateBaseController';

export class CreateChecklistController extends CreateBaseController<CreateChecklistReqBodyDTO> {

	protected getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput: ValidateCreateChecklistDTO = {
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateCreateChecklist,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}

	protected getInteractor(uniqueId: string) : UseCase<string> {
		const container = this.container;
		const interactorInput: SaveChecklistDTO = {
			... this.request.body,
			actorId: this.actorId,
			id: uniqueId
		};
		const interactorRepo = container.getNewRepoPicker(CreateChecklistInteractorRepoPicker);

		return container.getInteractor(
			CreateChecklist,
			interactorRepo,
			interactorInput
		);
	}

	protected getLogger(uniqueId: string) : LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(CreateChecklistLoggerRepoPicker);
		const logData = this.getLogData(uniqueId);

		return container.getLogger(
			LogCreateChecklist,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getLogData(uniqueId: string): LogDataForCreateChecklist {
		return {
			... this.request.body,
			id: uniqueId
		};
	}
}
