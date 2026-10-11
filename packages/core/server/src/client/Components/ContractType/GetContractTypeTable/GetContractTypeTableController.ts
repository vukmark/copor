import {GetContractTypeDTO} from '@copor/core/domain/Components/ContractType/interactor/dto/GetContractTypeDTO';
import {PaginatedTableBaseController} from '@copor/core/client/Core/Controller/PaginatedTableBaseController';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateGetContractTypeList} from '@copor/core/domain/Components/ContractType/validations/ValidateGetContractTypeList';
import {GetContractTypeList} from '@copor/core/domain/Components/ContractType/interactor/GetContractTypeList';
import {
	GetContractTypeListInteractorRepoPicker
} from '@copor/core/client/Components/ContractType/GetContractTypeList/repo/repoPicker/GetContractTypeListInteractorRepoPicker';
import {LogGetContractTypeList} from '@copor/core/domain/Components/ContractType/logger/LogGetContractTypeList';
import {
	GetContractTypeListLoggerRepoPicker
} from '@copor/core/client/Components/ContractType/GetContractTypeList/repo/repoPicker/GetContractTypeListLoggerRepoPicker';
import {
	GetContractTypeTablePresenter
} from '@copor/core/client/Components/ContractType/GetContractTypeTable/GetContractTypeTablePresenter';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {PaginationParams} from '@copor/core/client/Core/Presenter/PaginationParams';
import {Presenter} from '@copor/core/client/Interface/Presenter';
import {PaginatedTableModelDTO} from '@copor/core/client/Core/Table/dto/TableModelDTO';

export class GetContractTypeTableController extends PaginatedTableBaseController<GetContractTypeDTO> {
	protected getPresenter(response: GetContractTypeDTO[], paginationParams: PaginationParams): Presenter<PaginatedTableModelDTO> {
		return this.container.getPresenter(GetContractTypeTablePresenter, response, this.container.appContext, paginationParams);
	}

	protected getValidator(): Validator {
		return this.container.getValidator(
			ValidateGetContractTypeList,
			this.actorId,
			this.container.getNewRepoPicker(PermissionValidatorRepoPicker),
			undefined
		);
	}

	protected getInteractor(): UseCase<GetContractTypeDTO[]> {
		return this.container.getInteractor(
			GetContractTypeList,
			this.container.getNewRepoPicker(GetContractTypeListInteractorRepoPicker),
			{
				filters: this.request.body.filterList,
				offset: this.request.body.offset,
				limit: this.request.body.limit
			}
		);
	}

	protected getLogger(): LogAction {
		return this.container.getLogger(
			LogGetContractTypeList,
			this.container.getNewRepoPicker(GetContractTypeListLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			undefined
		);
	}
}
