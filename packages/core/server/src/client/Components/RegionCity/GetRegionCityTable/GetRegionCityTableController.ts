import {PaginatedTableBaseController} from '@copor/core/client/Core/Controller/PaginatedTableBaseController';
import {PaginatedTableModelDTO} from '@copor/core/client/Core/Table/dto/TableModelDTO';
import {GetRegionCityDTO} from '@copor/core/domain/Components/RegionCity/interactor/dto/GetRegionCityDTO';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateGetRegionCityList} from '@copor/core/domain/Components/RegionCity/validations/ValidateGetRegionCityList';
import {
	GetRegionCityListInteractorRepoPicker
} from '@copor/core/client/Components/RegionCity/GetRegionCityList/repo/repoPicker/GetRegionCityListInteractorRepoPicker';
import {GetRegionCityList} from '@copor/core/domain/Components/RegionCity/interactor/GetRegionCityList';
import {
	GetRegionCityListLoggerRepoPicker
} from '@copor/core/client/Components/RegionCity/GetRegionCityList/repo/repoPicker/GetRegionCityListLoggerRepoPicker';
import {LogGetRegionCityList} from '@copor/core/domain/Components/RegionCity/logger/LogGetRegionCityList';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {
	GetRegionCityTablePresenter
} from '@copor/core/client/Components/RegionCity/GetRegionCityTable/GetRegionCityTablePresenter';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {PaginationParams} from '@copor/core/client/Core/Presenter/PaginationParams';
import {Presenter} from '@copor/core/client/Interface/Presenter';

export class GetRegionCityTableController extends PaginatedTableBaseController<GetRegionCityDTO> {
	protected getPresenter(response: GetRegionCityDTO[], paginationParams: PaginationParams): Presenter<PaginatedTableModelDTO> {
		return this.container.getPresenter(GetRegionCityTablePresenter, response, this.container.appContext, paginationParams);
	}

	protected getValidator(): Validator {
		return this.container.getValidator(
			ValidateGetRegionCityList,
			this.actorId,
			this.container.getNewRepoPicker(PermissionValidatorRepoPicker),
			undefined
		);
	}

	protected getInteractor(): UseCase<GetRegionCityDTO[]> {
		return this.container.getInteractor(
			GetRegionCityList,
			this.container.getNewRepoPicker(GetRegionCityListInteractorRepoPicker),
			{
				filters: this.request.body.filterList,
				offset: this.request.body.offset,
				limit: this.request.body.limit
			}
		);
	}

	protected getLogger(): LogAction {
		return this.container.getLogger(
			LogGetRegionCityList,
			this.container.getNewRepoPicker(GetRegionCityListLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			undefined
		);
	}
}
