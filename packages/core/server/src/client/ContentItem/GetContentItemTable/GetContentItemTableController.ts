import {PaginatedTableBaseController} from '@copor/core/client/Core/Controller/PaginatedTableBaseController';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {PaginatedTableModelDTO} from '@copor/core/client/Core/Table/dto/TableModelDTO';
import {GetContentItemDTO} from '@copor/core/domain/ContentItem/interactor/dto/GetContentItemDTO';
import {GetContentItemTablePresenter} from '@copor/core/client/ContentItem/GetContentItemTable/GetContentItemTablePresenter';
import {ValidateGetContentItemList} from '@copor/core/domain/ContentItem/validations/ValidateGetContentItemList';
import {GetContentItemList} from '@copor/core/domain/ContentItem/interactor/GetContentItemList';
import {LogGetContentItemList} from '@copor/core/domain/ContentItem/logger/LogGetContentItemList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {PaginationParams} from '@copor/core/client/Core/Presenter/PaginationParams';
import {Presenter} from '@copor/core/client/Interface/Presenter';
import {
	GetContentItemListInteractorRepoPicker
} from '@copor/core/client/ContentItem/GetContentItemList/repoPicker/GetContentItemListInteractorRepoPicker';
import {
	GetContentItemListLoggerRepoPicker
} from '@copor/core/client/ContentItem/GetContentItemList/repoPicker/GetContentItemListLoggerRepoPicker';

export class GetContentItemTableController extends PaginatedTableBaseController<GetContentItemDTO> {
	protected getPresenter(response: GetContentItemDTO[], paginationParams: PaginationParams): Presenter<PaginatedTableModelDTO> {
		return this.container.getPresenter(GetContentItemTablePresenter, response, this.container.appContext, paginationParams);
	}

	protected getValidator(): Validator {
		return this.container.getValidator(
			ValidateGetContentItemList,
			this.actorId,
			this.container.getNewRepoPicker(PermissionValidatorRepoPicker),
			undefined
		);
	}

	protected getInteractor(): UseCase<GetContentItemDTO[]> {
		return this.container.getInteractor(
			GetContentItemList,
			this.container.getNewRepoPicker(GetContentItemListInteractorRepoPicker),
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
			LogGetContentItemList,
			this.container.getNewRepoPicker(GetContentItemListLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			undefined
		);
	}
}