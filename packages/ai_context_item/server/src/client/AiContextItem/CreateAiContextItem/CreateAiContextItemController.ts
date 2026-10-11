import {CreateBaseController} from '@copor/core/client/Core/Controller/CreateBaseController';
import {
	CreateAiContextItemReqBodyDTO
} from '@copor/ai_context_item/client/AiContextItem/CreateAiContextItem/dto/CreateAiContextItemReqBodyDTO';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {
	CreateAiContextItemValidatorPermissionRepoPicker
} from '@copor/ai_context_item/client/AiContextItem/CreateAiContextItem/repo/repoPicker/CreateAiContextItemValidatorPermissionRepoPicker';
import {
	CreateAiContextItemValidatorStorageRepoPicker
} from '@copor/ai_context_item/client/AiContextItem/CreateAiContextItem/repo/repoPicker/CreateAiContextItemValidatorStorageRepoPicker';
import {ValidateCreateAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/validations/dto/ValidateCreateAiContextItemDTO';
import {ValidateCreateAiContextItem} from '@copor/ai_context_item/domain/AiContextItem/validations/ValidateCreateAiContextItem';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {SaveAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/interactor/dto/SaveAiContextItemDTO';
import {
	CreateAiContextItemInteractorRepoPicker
} from '@copor/ai_context_item/client/AiContextItem/CreateAiContextItem/repo/repoPicker/CreateAiContextItemInteractorRepoPicker';
import {CreateAiContextItem} from '@copor/ai_context_item/domain/AiContextItem/interactor/CreateAiContextItem';
import {
	LogCreateAiContextItem,
	LogDataForCreateAiContextItem
} from '@copor/ai_context_item/domain/AiContextItem/logger/LogCreateAiContextItem';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {
	CreateAiContextItemLoggerRepoPicker
} from '@copor/ai_context_item/client/AiContextItem/CreateAiContextItem/repo/repoPicker/CreateAiContextItemLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';

export class CreateAiContextItemController extends CreateBaseController<CreateAiContextItemReqBodyDTO> {
	protected getValidator(): Validator {
		const container = this.container;

		const validatorPermissionRepo
            = container.getNewRepoPicker(CreateAiContextItemValidatorPermissionRepoPicker);
		const validatorStorageRepo
            = container.getNewRepoPicker(CreateAiContextItemValidatorStorageRepoPicker);

		const validatorInput: ValidateCreateAiContextItemDTO = {
			answerDe: this.request.body.answerDe,
			answerEn: this.request.body.answerEn,
			questionDe: this.request.body.questionDe,
			questionEn: this.request.body.questionEn,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateCreateAiContextItem,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor(uniqueId: string): UseCase<string> {
		const container = this.container;

		const interactorInput: SaveAiContextItemDTO = {
			id: uniqueId,
			answerDe: this.request.body.answerDe,
			answerEn: this.request.body.answerEn,
			questionDe: this.request.body.questionDe,
			questionEn: this.request.body.questionEn,
			actorId: this.actorId
		};

		const interactorRepo
            = container.getNewRepoPicker(CreateAiContextItemInteractorRepoPicker);

		return container.getInteractor(
			CreateAiContextItem,
			interactorRepo,
			interactorInput
		);
	}

	protected getLogger(uniqueId: string): LogAction {
		const container = this.container;

		const loggerRepo
            = container.getNewRepoPicker(CreateAiContextItemLoggerRepoPicker);

		const logData = this.getLogData(uniqueId);

		return container.getLogger(
			LogCreateAiContextItem,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	protected getLogData(uniqueId: string): LogDataForCreateAiContextItem {
		return {
			... this.request.body,
			id: uniqueId
		};
	}
}