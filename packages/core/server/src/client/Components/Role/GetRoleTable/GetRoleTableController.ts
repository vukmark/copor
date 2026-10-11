import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetRoleTablePresenter} from '@copor/core/client/Components/Role/GetRoleTable/GetRoleTablePresenter';
import {GetRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/GetRoleDTO';
import {ValidateGetRoleList} from '@copor/core/domain/Components/Role/validations/ValidateGetRoleList';
import {
	GetRoleListInteractorRepoPicker
} from '@copor/core/client/Components/Role/GetRoleList/repo/repoPicker/GetRoleListInteractorRepoPicker';
import {GetRoleList} from '@copor/core/domain/Components/Role/interactor/GetRoleList';
import {
	GetRoleListLoggerRepoPicker
} from '@copor/core/client/Components/Role/GetRoleList/repo/repoPicker/GetRoleListLoggerRepoPicker';
import {LogGetRoleList} from '@copor/core/domain/Components/Role/logger/LogGetRoleList';
import {PaginatedTableBaseController} from '@copor/core/client/Core/Controller/PaginatedTableBaseController';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {PaginationParams} from '@copor/core/client/Core/Presenter/PaginationParams';
import {Presenter} from '@copor/core/client/Interface/Presenter';
import {PaginatedTableModelDTO} from '@copor/core/client/Core/Table/dto/TableModelDTO';

export class GetRoleTableController extends PaginatedTableBaseController<GetRoleDTO> {
	protected getPresenter(response: GetRoleDTO[], paginationParams: PaginationParams): Presenter<PaginatedTableModelDTO> {
		return this.container.getPresenter(GetRoleTablePresenter, response, this.container.appContext, paginationParams);
	}

	protected getValidator(): Validator {
		return this.container.getValidator(
			ValidateGetRoleList,
			this.actorId,
			this.container.getNewRepoPicker(PermissionValidatorRepoPicker),
			undefined
		);
	}

	protected getInteractor(): UseCase<GetRoleDTO[]> {
		return this.container.getInteractor(
			GetRoleList,
			this.container.getNewRepoPicker(GetRoleListInteractorRepoPicker),
			{
				filters: this.request.body.filterList,
				offset: this.request.body.offset,
				limit: this.request.body.limit
			}
		);
	}

	protected getLogger(): LogAction {
		return this.container.getLogger(
			LogGetRoleList,
			this.container.getNewRepoPicker(GetRoleListLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			undefined
		);
	}
}
