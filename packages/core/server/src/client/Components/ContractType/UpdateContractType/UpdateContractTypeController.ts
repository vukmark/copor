import {UpdateContractTypeReqBodyDTO} from './dto/UpdateContractTypeReqBodyDTO';
import {
	UpdateContractTypeValidatorStorageRepoPicker
} from './repo/repoPicker/UpdateContractTypeValidatorStorageRepoPicker';
import {SaveContractTypeDTO} from '@copor/core/domain/Components/ContractType/interactor/dto/SaveContractTypeDTO';
import {ValidateUpdateContractType} from '@copor/core/domain/Components/ContractType/validations/ValidateUpdateContractType';
import {UpdateContractTypeInteractorRepoPicker} from './repo/repoPicker/UpdateContractTypeInteractorRepoPicker';
import {UpdateContractType} from '@copor/core/domain/Components/ContractType/interactor/UpdateContractType';
import {UpdateContractTypeLoggerRepoPicker} from './repo/repoPicker/UpdateContractTypeLoggerRepoPicker';
import {
	LogDataForUpdateContractType,
	LogUpdateContractType
} from '@copor/core/domain/Components/ContractType/logger/LogUpdateContractType';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';

export class UpdateContractTypeController extends UpdateBaseController<UpdateContractTypeReqBodyDTO> {
	protected getValidator(): Validator {
		const validatorPermissionRepo = this.container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = this.container.getNewRepoPicker(
			UpdateContractTypeValidatorStorageRepoPicker
		);

		return this.container.getValidator(
			ValidateUpdateContractType,
			this.getValidatorInput(),
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor() {
		return this.container.getInteractor(
			UpdateContractType,
			this.container.getNewRepoPicker(UpdateContractTypeInteractorRepoPicker),
			this.getValidatorInput()
		);
	}

	protected getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(UpdateContractTypeLoggerRepoPicker);
		const logData: LogDataForUpdateContractType = this.request.body;

		return this.container.getLogger(
			LogUpdateContractType,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getValidatorInput(): SaveContractTypeDTO {
		return {
			... this.request.body,
			actorId: this.actorId
		};
	}
}
