import {CreateContractTypeReqBodyDTO} from './dto/CreateContractTypeReqBodyDTO';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	ValidateCreateContractTypeDTO
} from '@copor/core/domain/Components/ContractType/validations/dto/ValidateCreateContractTypeDTO';
import {ValidateCreateContractType} from '@copor/core/domain/Components/ContractType/validations/ValidateCreateContractType';
import {SaveContractTypeDTO} from '@copor/core/domain/Components/ContractType/interactor/dto/SaveContractTypeDTO';
import {CreateContractTypeInteractorRepoPicker} from './repo/repoPicker/CreateContractTypeInteractorRepoPicker';
import {CreateContractType} from '@copor/core/domain/Components/ContractType/interactor/CreateContractType';
import {CreateContractTypeLoggerRepoPicker} from './repo/repoPicker/CreateContractTypeLoggerRepoPicker';
import {
	LogCreateContractType,
	LogDataForCreateContractType
} from '@copor/core/domain/Components/ContractType/logger/LogCreateContractType';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {CreateBaseController} from '@copor/core/client/Core/Controller/CreateBaseController';

export class CreateContractTypeController extends CreateBaseController<CreateContractTypeReqBodyDTO> {
	protected getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput: ValidateCreateContractTypeDTO = {
			... this.request.body,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateCreateContractType,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}

	protected getInteractor(uniqueId: string) : UseCase<string> {
		const container = this.container;
		const interactorInput: SaveContractTypeDTO = {
			... this.request.body,
			actorId: this.actorId,
			id: uniqueId
		};
		const interactorRepo = container.getNewRepoPicker(CreateContractTypeInteractorRepoPicker);

		return container.getInteractor(
			CreateContractType,
			interactorRepo,
			interactorInput
		);
	}

	protected getLogger(uniqueId: string) : LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(CreateContractTypeLoggerRepoPicker);
		const logData = this.getLogData(uniqueId);

		return container.getLogger(
			LogCreateContractType,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getLogData(uniqueId: string): LogDataForCreateContractType {
		return {
			... this.request.body,
			id: uniqueId
		};
	}
}
