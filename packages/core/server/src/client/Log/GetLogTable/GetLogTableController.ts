import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetLogDTO} from '@copor/core/domain/Log/interactor/dto/GetLogDTO';
import {ValidateGetLogList} from '@copor/core/domain/Log/validation/ValidateGetLogList';
import {GetLogListInteractorRepoPicker} from '@copor/core/client/Log/GetLogList/repo/repoPicker/GetLogListInteractorRepoPicker';
import {GetLogList} from '@copor/core/domain/Log/interactor/GetLogList';
import {GetLogListLoggerRepoPicker} from '@copor/core/client/Log/GetLogList/repo/repoPicker/GetLogListLoggerRepoPicker';
import {LogGetLogList} from '@copor/core/domain/Log/logger/LogGetLogList';
import {GetLogTablePresenter} from '@copor/core/client/Log/GetLogTable/GetLogTablePresenter';
import {PaginatedTableBaseController} from '@copor/core/client/Core/Controller/PaginatedTableBaseController';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {PaginationParams} from '@copor/core/client/Core/Presenter/PaginationParams';
import {Presenter} from '@copor/core/client/Interface/Presenter';
import {PaginatedTableModelDTO} from '@copor/core/client/Core/Table/dto/TableModelDTO';

export class GetLogTableController extends PaginatedTableBaseController<GetLogDTO> {
	protected getPresenter(response: GetLogDTO[], paginationParams: PaginationParams): Presenter<PaginatedTableModelDTO> {
		return this.container.getPresenter(GetLogTablePresenter, response, this.container.appContext, paginationParams);
	}

	protected getValidator(): Validator {
		return this.container.getValidator(
			ValidateGetLogList,
			this.actorId,
			this.container.getNewRepoPicker(PermissionValidatorRepoPicker),
			undefined
		);
	}

	protected getInteractor(): UseCase<GetLogDTO[]> {
		return this.container.getInteractor(
			GetLogList,
			this.container.getNewRepoPicker(GetLogListInteractorRepoPicker),
			{
				filters: this.request.body.filterList,
				offset: this.request.body.offset,
				limit: this.request.body.limit
			}
		);
	}

	protected getLogger(): LogAction {
		return this.container.getLogger(
			LogGetLogList,
			this.container.getNewRepoPicker(GetLogListLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			undefined
		);
	}
}
