import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/GetCountryDTO';
import {ValidateGetCountryList} from '@copor/core/domain/Components/Country/validations/ValidateGetCountryList';
import {GetCountryListInteractorRepoPicker}
	from '@copor/core/client/Components/Country/GetCountryList/repo/repoPicker/GetCountryListInteractorRepoPicker';
import {GetCountryList} from '@copor/core/domain/Components/Country/interactor/GetCountryList';
import {GetCountryListLoggerRepoPicker}
	from '@copor/core/client/Components/Country/GetCountryList/repo/repoPicker/GetCountryListLoggerRepoPicker';
import {LogGetCountryList} from '@copor/core/domain/Components/Country/logger/LogGetCountryList';
import {GetCountryTablePresenter} from '@copor/core/client/Components/Country/GetContryTable/GetCountryTablePresenter';
import {PaginatedTableBaseController} from '@copor/core/client/Core/Controller/PaginatedTableBaseController';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {PaginationParams} from '@copor/core/client/Core/Presenter/PaginationParams';
import {Presenter} from '@copor/core/client/Interface/Presenter';
import {PaginatedTableModelDTO} from '@copor/core/client/Core/Table/dto/TableModelDTO';

export class GetCountryTableController extends PaginatedTableBaseController<GetCountryDTO> {
	protected getPresenter(response: GetCountryDTO[], paginationParams: PaginationParams): Presenter<PaginatedTableModelDTO> {
		return this.container.getPresenter(GetCountryTablePresenter, response, this.container.appContext, paginationParams);
	}

	protected getValidator(): Validator {
		return this.container.getValidator(
			ValidateGetCountryList,
			this.actorId,
			this.container.getNewRepoPicker(PermissionValidatorRepoPicker),
			undefined
		);
	}

	protected getInteractor(): UseCase<GetCountryDTO[]> {
		return this.container.getInteractor(
			GetCountryList,
			this.container.getNewRepoPicker(GetCountryListInteractorRepoPicker),
			{
				filters: this.request.body.filterList,
				offset: this.request.body.offset,
				limit: this.request.body.limit
			}
		);
	}

	protected getLogger(): LogAction {
		return this.container.getLogger(
			LogGetCountryList,
			this.container.getNewRepoPicker(GetCountryListLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			undefined
		);
	}
}
