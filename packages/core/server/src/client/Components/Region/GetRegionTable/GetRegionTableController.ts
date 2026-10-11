import {PaginatedTableBaseController} from '@copor/core/client/Core/Controller/PaginatedTableBaseController';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {PaginatedTableModelDTO} from '@copor/core/client/Core/Table/dto/TableModelDTO';
import {GetRegionDTO} from '@copor/core/domain/Components/Region/interactor/dto/GetRegionDTO';
import {GetRegionTablePresenter} from '@copor/core/client/Components/Region/GetRegionTable/GetRegionTablePresenter';
import {
	GetRegionListInteractorRepoPicker
} from '@copor/core/client/Components/Region/GetRegionList/repo/repoPicker/GetRegionListInteractorRepoPicker';
import {GetRegionList} from '@copor/core/domain/Components/Region/interactor/GetRegionList';
import {
	GetRegionListLoggerRepoPicker
} from '@copor/core/client/Components/Region/GetRegionList/repo/repoPicker/GetRegionListLoggerRepoPicker';
import {LogGetRegionList} from '@copor/core/domain/Components/Region/logger/LogGetRegionList';
import {ValidateGetRegionList} from '@copor/core/domain/Components/Region/validations/ValidateGetRegionList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {PaginationParams} from '@copor/core/client/Core/Presenter/PaginationParams';
import {Presenter} from '@copor/core/client/Interface/Presenter';

export class GetRegionTableController extends PaginatedTableBaseController<GetRegionDTO> {
	protected getPresenter(response: GetRegionDTO[], paginationParams: PaginationParams): Presenter<PaginatedTableModelDTO> {
		return this.container.getPresenter(GetRegionTablePresenter, response, this.container.appContext, paginationParams);
	}

	protected getValidator(): Validator {
		return this.container.getValidator(
			ValidateGetRegionList,
			this.actorId,
			this.container.getNewRepoPicker(PermissionValidatorRepoPicker),
			undefined
		);
	}

	protected getInteractor(): UseCase<GetRegionDTO[]> {
		return this.container.getInteractor(
			GetRegionList,
			this.container.getNewRepoPicker(GetRegionListInteractorRepoPicker),
			{
				filters: this.request.body.filterList,
				offset: this.request.body.offset,
				limit: this.request.body.limit
			}
		);
	}

	protected getLogger(): LogAction {
		return this.container.getLogger(
			LogGetRegionList,
			this.container.getNewRepoPicker(GetRegionListLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			undefined
		);
	}
}
