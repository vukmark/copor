import {
	ValidateDeleteContractTypeDTO
} from '@copor/core/domain/Components/ContractType/validations/dto/ValidateDeleteContractTypeDTO';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	DeleteContractTypeValidatorStorageRepoPicker
} from './repo/repoPicker/DeleteContractTypeValidatorStorageRepoPicker';
import {ValidateDeleteContractType} from '@copor/core/domain/Components/ContractType/validations/ValidateDeleteContractType';
import {DeleteContractTypeInteractorRepoPicker} from './repo/repoPicker/DeleteContractTypeInteractorRepoPicker';
import {DeleteContractType} from '@copor/core/domain/Components/ContractType/interactor/DeleteContractType';
import {LogDeleteContractType} from '@copor/core/domain/Components/ContractType/logger/LogDeleteContractType';
import {DeleteContractTypeLoggerRepoPicker} from './repo/repoPicker/DeleteContractTypeLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {DeleteBaseController} from '@copor/core/client/Core/Controller/DeleteBaseController';

export interface DeleteContractTypeParams {
	id: string;
}

export class DeleteContractTypeController extends DeleteBaseController<DeleteContractTypeParams> {
	protected getValidator(id: string) : Validator {
		const c = this.container;
		const input: ValidateDeleteContractTypeDTO = {
			actorId: this.actorId,
			contractTypeId: id
		};

		return c.getValidator(
			ValidateDeleteContractType,
			input,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(DeleteContractTypeValidatorStorageRepoPicker)
		);
	}

	protected getInteractor(id: string) : UseCase<void> {
		const c = this.container;
		const repo = c.getNewRepoPicker(DeleteContractTypeInteractorRepoPicker);

		return c.getInteractor(DeleteContractType, repo, id);
	}

	protected getLogger(id: string) : LogAction {
		return this.container.getLogger(
			LogDeleteContractType,
			this.container.getNewRepoPicker(DeleteContractTypeLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{contractTypeId: id}
		);
	}
}
