import {GetFormViewModel} from '@copor/core/client/Core/Form/GetFormViewModel';
import {GetContractTypeDTO} from '@copor/core/domain/Components/ContractType/interactor/dto/GetContractTypeDTO';
import {
	GetContractTypeFormPresenter
} from '@copor/core/client/Components/ContractType/GetContractTypeForm/GetContractTypeFormPresenter';
import {ValidateGetContractTypeDTO} from '@copor/core/domain/Components/ContractType/validations/dto/ValidateGetContractTypeDTO';
import {ValidateGetContractType} from '@copor/core/domain/Components/ContractType/validations/ValidateGetContractType';

import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	GetContractTypeValidatorStorageRepoPicker
} from '@copor/core/client/Components/ContractType/GetContractType/repo/repoPicker/GetContractTypeValidatorStorageRepoPicker';
import {
	GetContractTypeLoggerRepoPicker
} from '@copor/core/client/Components/ContractType/GetContractType/repo/repoPicker/GetContractTypeLoggerRepoPicker';
import {LogGetContractType} from '@copor/core/domain/Components/ContractType/logger/LogGetContractType';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {
	GetContractTypeInteractorRepoPicker
} from '@copor/core/client/Components/ContractType/GetContractType/repo/repoPicker/GetContractTypeInteractorRepoPicker';
import {GetContractType} from '@copor/core/domain/Components/ContractType/interactor/GetContractType';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {FormBaseController} from '@copor/core/client/Core/Controller/FormBaseController';
import {Presenter} from '@copor/core/client/Interface/Presenter';

export class GetContractTypeFormController extends FormBaseController<GetContractTypeDTO, GetFormViewModel> {
	protected getPresenter(response: GetContractTypeDTO): Presenter<GetFormViewModel> {
		return this.container.getPresenter(GetContractTypeFormPresenter, response);
	}
	protected getDefaultFormValues() : GetContractTypeDTO {
		return {
			description: '',
			file: '',
			id: '',
			name: '',
			publishStatus: PublishStatus.unpublished
		};
	}

	protected getValidator(id: string) {
		const c = this.container;
		const validatorInput: ValidateGetContractTypeDTO = {
			actorId: this.actorId,
			contractType: id
		};

		return c.getValidator(
			ValidateGetContractType,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetContractTypeValidatorStorageRepoPicker)
		);
	}

	protected getLogger(id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetContractTypeLoggerRepoPicker);
		const logData = {contractTypeId: id};

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
