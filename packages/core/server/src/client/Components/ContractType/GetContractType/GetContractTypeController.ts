import {ValidateGetContractTypeDTO} from '@copor/core/domain/Components/ContractType/validations/dto/ValidateGetContractTypeDTO';
import {ValidateGetContractType} from '@copor/core/domain/Components/ContractType/validations/ValidateGetContractType';
import {GetContractTypeDTO} from '@copor/core/domain/Components/ContractType/interactor/dto/GetContractTypeDTO';
import {GetContractType} from '@copor/core/domain/Components/ContractType/interactor/GetContractType';
import {LogGetContractType} from '@copor/core/domain/Components/ContractType/logger/LogGetContractType';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {GetContractTypeViewModel} from './GetContractTypeViewModel';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetContractTypeValidatorStorageRepoPicker} from './repo/repoPicker/GetContractTypeValidatorStorageRepoPicker';
import {GetContractTypeInteractorRepoPicker} from './repo/repoPicker/GetContractTypeInteractorRepoPicker';
import {GetContractTypeLoggerRepoPicker} from './repo/repoPicker/GetContractTypeLoggerRepoPicker';
import {GetContractTypePresenter} from './GetContractTypePresenter';
import {SingleItemBaseController} from '@copor/core/client/Core/Controller/SingleItemBaseController';
import {Presenter} from '@copor/core/client/Interface/Presenter';

export class GetContractTypeController extends SingleItemBaseController<GetContractTypeDTO, GetContractTypeViewModel> {
	protected getPresenter(response: GetContractTypeDTO): Presenter<GetContractTypeViewModel> {
		return this.container.getPresenter(GetContractTypePresenter, response);
	}

	protected getValidator(id: string) {
		const c = this.container;
		const validatorInput: ValidateGetContractTypeDTO = {actorId: this.actorId, contractType: id};

		return c.getValidator(
			ValidateGetContractType,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetContractTypeValidatorStorageRepoPicker)
		);
	}

	protected getLogger(id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetContractTypeLoggerRepoPicker);
		const logData = {
			contractTypeId: id
		};

		return this.container.getLogger(
			LogGetContractType,
			loggerRepository,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	protected getInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetContractTypeInteractorRepoPicker);

		return this.container.getInteractor(
			GetContractType,
			interactorRepository,
			id
		);
	}
}
