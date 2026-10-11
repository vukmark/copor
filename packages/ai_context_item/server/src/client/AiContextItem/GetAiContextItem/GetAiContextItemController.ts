import {SingleItemBaseController} from '@copor/core/client/Core/Controller/SingleItemBaseController';
import {GetAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/interactor/dto/GetAiContextItemDTO';
import {GetAiContextItemViewModel} from '@copor/ai_context_item/client/AiContextItem/GetAiContextItem/GetAiContextItemViewModel';
import {Presenter} from '@copor/core/client/Interface/Presenter';
import {GetAiContextItemPresenter} from '@copor/ai_context_item/client/AiContextItem/GetAiContextItem/GetAiContextItemPresenter';
import {ValidateGetAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/validations/dto/ValidateGetAiContextItemDTO';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	GetAiContextItemValidatorStorageRepoPicker
} from '@copor/ai_context_item/client/AiContextItem/GetAiContextItem/repoPicker/GetAiContextItemValidatorStorageRepoPicker';
import {ValidateGetAiContextItem} from '@copor/ai_context_item/domain/AiContextItem/validations/ValidateGetAiContextItem';
import {
	GetAiContextItemLoggerRepoPicker
} from '@copor/ai_context_item/client/AiContextItem/GetAiContextItem/repoPicker/GetAiContextItemLoggerRepoPicker';
import {LogGetAiContextItem} from '@copor/ai_context_item/domain/AiContextItem/logger/LogGetAiContextItem';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {
	GetAiContextItemInteractorRepoPicker
} from '@copor/ai_context_item/client/AiContextItem/GetAiContextItem/repoPicker/GetAiContextItemInteractorRepoPicker';
import {GetAiContextItem} from '@copor/ai_context_item/domain/AiContextItem/interactor/GetAiContextItem';

export class GetAiContextItemController extends SingleItemBaseController<GetAiContextItemDTO, GetAiContextItemViewModel> {
	protected getPresenter(response: GetAiContextItemDTO): Presenter<GetAiContextItemViewModel> {
		return this.container.getPresenter(GetAiContextItemPresenter, response);
	}

	protected getValidator(id: string) {
		const c = this.container;
		const validatorInput: ValidateGetAiContextItemDTO = {
			actorId: this.actorId,
			aiContextItemId: id
		};

		return c.getValidator(
			ValidateGetAiContextItem,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetAiContextItemValidatorStorageRepoPicker)
		);
	}

	protected getInteractor(id: string): UseCase<GetAiContextItemDTO> {
		const interactorRepository = this.container.getNewRepoPicker(GetAiContextItemInteractorRepoPicker);

		return this.container.getInteractor(
			GetAiContextItem,
			interactorRepository,
			id
		);
	}

	protected getLogger(id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetAiContextItemLoggerRepoPicker);
		const logData = {aiContextItemId: id};

		return this.container.getLogger(
			LogGetAiContextItem,
			loggerRepository,
			new CreateLogDetails(this.actorId),
			logData
		);
	}
}