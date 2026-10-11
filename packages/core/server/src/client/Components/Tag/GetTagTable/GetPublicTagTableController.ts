import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/GetTagDTO';
import {ValidateGetPublicTagList} from '@copor/core/domain/Components/Tag/validation/ValidateGetPublicTagList';
import {
	GetPublicTagListInteractorRepoPicker
} from '@copor/core/client/Components/Tag/GetPublicTagList/repo/repoPicker/GetPublicTagListInteractorRepoPicker';
import {GetPublicTagList} from '@copor/core/domain/Components/Tag/interactor/GetPublicTagList';
import {
	GetPublicTagListLoggerRepoPicker
} from '@copor/core/client/Components/Tag/GetPublicTagList/repo/repoPicker/GetPublicTagListLoggerRepoPicker';
import {LogGetPublicTagList} from '@copor/core/domain/Components/Tag/logger/LogGetPublicTagList';
import {GetPublicTagTablePresenter} from '@copor/core/client/Components/Tag/GetTagTable/GetPublicTagTablePresenter';
import {PaginatedTableBaseController} from '@copor/core/client/Core/Controller/PaginatedTableBaseController';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {PaginationParams} from '@copor/core/client/Core/Presenter/PaginationParams';
import {Presenter} from '@copor/core/client/Interface/Presenter';
import {PaginatedTableModelDTO} from '@copor/core/client/Core/Table/dto/TableModelDTO';

export class GetPublicTagTableController extends PaginatedTableBaseController<GetTagDTO> {
	protected getPresenter(response: GetTagDTO[], paginationParams: PaginationParams): Presenter<PaginatedTableModelDTO> {
		return this.container.getPresenter(GetPublicTagTablePresenter, response, this.container.appContext, paginationParams);
	}

	protected getValidator(): Validator {
		return this.container.getValidator(
			ValidateGetPublicTagList,
			this.actorId,
			this.container.getNewRepoPicker(PermissionValidatorRepoPicker),
			undefined
		);
	}

	protected getInteractor(): UseCase<GetTagDTO[]> {
		return this.container.getInteractor(
			GetPublicTagList,
			this.container.getNewRepoPicker(GetPublicTagListInteractorRepoPicker),
			{
				filters: this.request.body.filterList,
				offset: this.request.body.offset,
				limit: this.request.body.limit
			}
		);
	}

	protected getLogger(): LogAction {
		return this.container.getLogger(
			LogGetPublicTagList,
			this.container.getNewRepoPicker(GetPublicTagListLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			undefined
		);
	}
}
