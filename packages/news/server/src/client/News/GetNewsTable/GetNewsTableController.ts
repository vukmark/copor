import {PaginatedTableBaseController} from '@copor/core/client/Core/Controller/PaginatedTableBaseController';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {PaginatedTableModelDTO} from '@copor/core/client/Core/Table/dto/TableModelDTO';
import {GetNewsDTO} from '@copor/news/domain/News/interactor/dto/GetNewsDTO';
import {GetNewsTablePresenter} from '@copor/news/client/News/GetNewsTable/GetNewsTablePresenter';
import {ValidateGetNewsList} from '@copor/news/domain/News/validations/ValidateGetNewsList';
import {
	GetNewsListInteractorRepoPicker
} from '@copor/news/client/News/GetNewsList/repo/repoPicker/GetNewsListInteractorRepoPicker';
import {GetNewsList} from '@copor/news/domain/News/interactor/GetNewsList';
import {GetNewsListLoggerRepoPicker} from '@copor/news/client/News/GetNewsList/repo/repoPicker/GetNewsListLoggerRepoPicker';
import {LogGetNewsList} from '@copor/news/domain/News/logger/LogGetNewsList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {PaginationParams} from '@copor/core/client/Core/Presenter/PaginationParams';
import {Presenter} from '@copor/core/client/Interface/Presenter';

export class GetNewsTableController extends PaginatedTableBaseController<GetNewsDTO> {
	protected getPresenter(response: GetNewsDTO[], paginationParams: PaginationParams): Presenter<PaginatedTableModelDTO> {
		return this.container.getPresenter(GetNewsTablePresenter, response, this.container.appContext, paginationParams);
	}

	protected getValidator(): Validator {
		return this.container.getValidator(
			ValidateGetNewsList,
			this.actorId,
			this.container.getNewRepoPicker(PermissionValidatorRepoPicker),
			undefined
		);
	}

	protected getInteractor(): UseCase<GetNewsDTO[]> {
		return this.container.getInteractor(
			GetNewsList,
			this.container.getNewRepoPicker(GetNewsListInteractorRepoPicker),
			{
				filters: this.request.body.filterList,
				offset: this.request.body.offset,
				limit: this.request.body.limit
			}
		);
	}

	protected getLogger(): LogAction {
		return this.container.getLogger(
			LogGetNewsList,
			this.container.getNewRepoPicker(GetNewsListLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			undefined
		);
	}
}
