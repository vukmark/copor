import {PaginatedTableBaseController} from '@copor/core/client/Core/Controller/PaginatedTableBaseController';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {PaginatedTableModelDTO} from '@copor/core/client/Core/Table/dto/TableModelDTO';
import {GetUserDeletionRequestDTO} from '@copor/core/domain/User/interactor/dto/GetUserDeletionRequestDTO';
import {GetUserDeletionRequestListTablePresenter}
	from '@copor/core/client/User/GetUserDeletionRequestListTable/GetUserDeletionRequestListTablePresenter';
import {ValidateGetUserDeletionRequestList} from '@copor/core/domain/User/validation/ValidateGetUserDeletionRequestList';
import {GetUserDeletionRequestListInteractorRepoPicker}
	from '@copor/core/client/User/GetUserDeletionRequestListTable/repo/repoPicker/GetUserDeletionRequestListInteractorRepoPicker';
import {GetUserDeletionRequestList} from '@copor/core/domain/User/interactor/GetUserDeletionRequestList';
import {GetUserDeletionRequestListLoggerRepoPicker}
	from '@copor/core/client/User/GetUserDeletionRequestListTable/repo/repoPicker/GetUserDeletionRequestListLoggerRepoPicker';
import {LogGetUserDeletionRequestList} from '@copor/core/domain/User/logger/LogGetUserDeletionRequestList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {PaginationParams} from '@copor/core/client/Core/Presenter/PaginationParams';
import {Presenter} from '@copor/core/client/Interface/Presenter';

export class GetUserDeletionRequestListTableController extends PaginatedTableBaseController<GetUserDeletionRequestDTO> {
	protected getPresenter(
		response: GetUserDeletionRequestDTO[],
		paginationParams: PaginationParams
	): Presenter<PaginatedTableModelDTO> {
		return this.container.getPresenter(
			GetUserDeletionRequestListTablePresenter,
			response,
			this.container.appContext,
			paginationParams
		);
	}

	protected getValidator(): Validator {
		return this.container.getValidator(
			ValidateGetUserDeletionRequestList,
			this.actorId,
			this.container.getNewRepoPicker(PermissionValidatorRepoPicker),
			undefined
		);
	}

	protected getInteractor(): UseCase<GetUserDeletionRequestDTO[]> {
		return this.container.getInteractor(
			GetUserDeletionRequestList,
			this.container.getNewRepoPicker(GetUserDeletionRequestListInteractorRepoPicker),
			{
				filters: this.request.body.filterList,
				offset: this.request.body.offset,
				limit: this.request.body.limit
			}
		);
	}

	protected getLogger(): LogAction {
		return this.container.getLogger(
			LogGetUserDeletionRequestList,
			this.container.getNewRepoPicker(GetUserDeletionRequestListLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			undefined
		);
	}
}
