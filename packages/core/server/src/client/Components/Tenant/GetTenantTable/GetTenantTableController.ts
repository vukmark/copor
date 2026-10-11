import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetTenantDTO} from '@copor/core/domain/Components/Tenant/interactor/dto/GetTenantDTO';
import {ValidateGetTenantList} from '@copor/core/domain/Components/Tenant/validations/ValidateGetTenantList';
import {
	GetTenantListInteractorRepoPicker
} from '@copor/core/client/Components/Tenant/GetTenantList/repo/repoPicker/GetTenantListInteractorRepoPicker';
import {GetTenantList} from '@copor/core/domain/Components/Tenant/interactor/GetTenantList';
import {
	GetTenantListLoggerRepoPicker
} from '@copor/core/client/Components/Tenant/GetTenantList/repo/repoPicker/GetTenantListLoggerRepoPicker';
import {LogGetTenantList} from '@copor/core/domain/Components/Tenant/logger/LogGetTenantList';
import {GetTenantTablePresenter} from '@copor/core/client/Components/Tenant/GetTenantTable/GetTenantTablePresenter';
import {PaginatedTableBaseController} from '@copor/core/client/Core/Controller/PaginatedTableBaseController';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {PaginationParams} from '@copor/core/client/Core/Presenter/PaginationParams';
import {Presenter} from '@copor/core/client/Interface/Presenter';
import {PaginatedTableModelDTO} from '@copor/core/client/Core/Table/dto/TableModelDTO';

export class GetTenantTableController extends PaginatedTableBaseController<GetTenantDTO> {
	protected getPresenter(response: GetTenantDTO[], paginationParams: PaginationParams): Presenter<PaginatedTableModelDTO> {
		return this.container.getPresenter(GetTenantTablePresenter, response, this.container.appContext, paginationParams);
	}

	protected getValidator(): Validator {
		return this.container.getValidator(
			ValidateGetTenantList,
			this.actorId,
			this.container.getNewRepoPicker(PermissionValidatorRepoPicker),
			undefined
		);
	}

	protected getInteractor(): UseCase<GetTenantDTO[]> {
		return this.container.getInteractor(
			GetTenantList,
			this.container.getNewRepoPicker(GetTenantListInteractorRepoPicker),
			{
				filters: this.request.body.filterList,
				offset: this.request.body.offset,
				limit: this.request.body.limit
			}
		);
	}

	protected getLogger(): LogAction {
		return this.container.getLogger(
			LogGetTenantList,
			this.container.getNewRepoPicker(GetTenantListLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			undefined
		);
	}
}
