import {PaginatedTableBaseController} from '@copor/core/client/Core/Controller/PaginatedTableBaseController';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {PaginatedTableModelDTO} from '@copor/core/client/Core/Table/dto/TableModelDTO';
import {GetStateDTO} from '@copor/core/domain/Components/State/interactor/dto/GetStateDTO';
import {GetStateTablePresenter} from '@copor/core/client/Components/State/GetStateTable/GetStateTablePresenter';
import {ValidateGetStateTableList} from '@copor/core/domain/Components/State/validations/ValidateGetStateTableList';
import {
	GetStateTableListInteractorRepoPicker
} from '@copor/core/client/Components/State/GetStateTable/repo/repoPicker/GetStateTableListInteractorRepoPicker';
import {GetStateTableList} from '@copor/core/domain/Components/State/interactor/GetStateTableList';
import {
	GetStateTableListLoggerRepoPicker
} from '@copor/core/client/Components/State/GetStateTable/repo/repoPicker/GetStateTableListLoggerRepoPicker';
import {LogGetStateTableList} from '@copor/core/domain/Components/State/logger/LogGetStateTableList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {PaginationParams} from '@copor/core/client/Core/Presenter/PaginationParams';
import {Presenter} from '@copor/core/client/Interface/Presenter';

export class GetStateTableController extends PaginatedTableBaseController<GetStateDTO> {
	protected getPresenter(response: GetStateDTO[], paginationParams: PaginationParams): Presenter<PaginatedTableModelDTO> {
		return this.container.getPresenter(GetStateTablePresenter, response, this.container.appContext, paginationParams);
	}

	protected getValidator(): Validator {
		return this.container.getValidator(
			ValidateGetStateTableList,
			this.actorId,
			this.container.getNewRepoPicker(PermissionValidatorRepoPicker),
			undefined
		);
	}

	protected getInteractor(): UseCase<GetStateDTO[]> {
		return this.container.getInteractor(
			GetStateTableList,
			this.container.getNewRepoPicker(GetStateTableListInteractorRepoPicker),
			{
				filters: this.request.body.filterList,
				offset: this.request.body.offset,
				limit: this.request.body.limit
			}
		);
	}

	protected getLogger(): LogAction {
		return this.container.getLogger(
			LogGetStateTableList,
			this.container.getNewRepoPicker(GetStateTableListLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			undefined
		);
	}
}
