import {PaginatedTableBaseController} from '@copor/core/client/Core/Controller/PaginatedTableBaseController';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {PaginatedTableModelDTO} from '@copor/core/client/Core/Table/dto/TableModelDTO';
import {GetLanguageDTO} from '@copor/core/domain/Components/Language/interactor/dto/GetLanguageDTO';
import {ValidateGetLanguageList} from '@copor/core/domain/Components/Language/validations/ValidateGetLanguageList';
import {
	GetLanguageListInteractorRepoPicker
} from '@copor/core/client/Components/Language/GetLanguageList/repo/repoPicker/GetLanguageListInteractorRepoPicker';
import {GetLanguageList} from '@copor/core/domain/Components/Language/interactor/GetLanguageList';
import {
	GetLanguageListLoggerRepoPicker
} from '@copor/core/client/Components/Language/GetLanguageList/repo/repoPicker/GetLanguageListLoggerRepoPicker';
import {LogGetLanguageList} from '@copor/core/domain/Components/Language/logger/LogGetLanguageList';
import {GetLanguageTablePresenter} from '@copor/core/client/Components/Language/GetLanguageTable/GetLanguageTablePresenter';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {PaginationParams} from '@copor/core/client/Core/Presenter/PaginationParams';
import {Presenter} from '@copor/core/client/Interface/Presenter';

export class GetLanguageTableController extends PaginatedTableBaseController<GetLanguageDTO> {
	protected getPresenter(response: GetLanguageDTO[], paginationParams: PaginationParams): Presenter<PaginatedTableModelDTO> {
		return this.container.getPresenter(GetLanguageTablePresenter, response, this.container.appContext, paginationParams);
	}

	protected getValidator(): Validator {
		return this.container.getValidator(
			ValidateGetLanguageList,
			this.actorId,
			this.container.getNewRepoPicker(PermissionValidatorRepoPicker),
			undefined
		);
	}

	protected getInteractor(): UseCase<GetLanguageDTO[]> {
		return this.container.getInteractor(
			GetLanguageList,
			this.container.getNewRepoPicker(GetLanguageListInteractorRepoPicker),
			{
				filters: this.request.body.filterList,
				offset: this.request.body.offset,
				limit: this.request.body.limit
			}
		);
	}

	protected getLogger(): LogAction {
		return this.container.getLogger(
			LogGetLanguageList,
			this.container.getNewRepoPicker(GetLanguageListLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			undefined
		);
	}
}
