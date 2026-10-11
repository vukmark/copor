import {PaginatedTableBaseController} from '@copor/core/client/Core/Controller/PaginatedTableBaseController';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {PaginatedTableModelDTO} from '@copor/core/client/Core/Table/dto/TableModelDTO';
import {GetAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/interactor/dto/GetAiContextItemDTO';
import {GetAiContextItemTablePresenter} from '@copor/ai_context_item/client/AiContextItem/GetAiContextItemTable/GetAiContextItemTablePresenter';
import {ValidateGetAiContextItemList} from '@copor/ai_context_item/domain/AiContextItem/validations/ValidateGetAiContextItemList';
import {GetAiContextItemList} from '@copor/ai_context_item/domain/AiContextItem/interactor/GetAiContextItemList';
import {LogGetAiContextItemList} from '@copor/ai_context_item/domain/AiContextItem/logger/LogGetAiContextItemList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {PaginationParams} from '@copor/core/client/Core/Presenter/PaginationParams';
import {Presenter} from '@copor/core/client/Interface/Presenter';
import {
	GetAiContextItemListInteractorRepoPicker
} from '@copor/ai_context_item/client/AiContextItem/GetAiContextItemList/repoPicker/GetAiContextItemListInteractorRepoPicker';
import {
	GetAiContextItemListLoggerRepoPicker
} from '@copor/ai_context_item/client/AiContextItem/GetAiContextItemList/repoPicker/GetAiContextItemListLoggerRepoPicker';

export class GetAiContextItemTableController extends PaginatedTableBaseController<GetAiContextItemDTO> {
	protected getPresenter(response: GetAiContextItemDTO[], paginationParams: PaginationParams): Presenter<PaginatedTableModelDTO> {
		return this.container.getPresenter(GetAiContextItemTablePresenter, response, this.container.appContext, paginationParams);
	}

	protected getValidator(): Validator {
		return this.container.getValidator(
			ValidateGetAiContextItemList,
			this.actorId,
			this.container.getNewRepoPicker(PermissionValidatorRepoPicker),
			undefined
		);
	}

	protected getInteractor(): UseCase<GetAiContextItemDTO[]> {
		return this.container.getInteractor(
			GetAiContextItemList,
			this.container.getNewRepoPicker(GetAiContextItemListInteractorRepoPicker),
			{
				filters: this.request.body.filterList,
				offset: this.request.body.offset,
				limit: this.request.body.limit,
				actorId: this.actorId
			}
		);
	}

	protected getLogger(): LogAction {
		return this.container.getLogger(
			LogGetAiContextItemList,
			this.container.getNewRepoPicker(GetAiContextItemListLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			undefined
		);
	}
}