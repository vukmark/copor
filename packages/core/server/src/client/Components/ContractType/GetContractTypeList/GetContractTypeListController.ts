import {BaseController} from '../../../Core/BaseController';
import {GetContractTypeViewModel} from '../GetContractType/GetContractTypeViewModel';
import {
	ValidateGetContractTypeList
} from '@copor/core/domain/Components/ContractType/validations/ValidateGetContractTypeList';
import {GetContractTypeListInteractorRepoPicker} from './repo/repoPicker/GetContractTypeListInteractorRepoPicker';
import {GetContractTypeList} from '@copor/core/domain/Components/ContractType/interactor/GetContractTypeList';
import {GetContractTypeListLoggerRepoPicker} from './repo/repoPicker/GetContractTypeListLoggerRepoPicker';
import {LogGetContractTypeList} from '@copor/core/domain/Components/ContractType/logger/LogGetContractTypeList';
import {CreateLogDetails} from '../../../GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {GetContractTypeDTO} from '@copor/core/domain/Components/ContractType/interactor/dto/GetContractTypeDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '../../../Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetListReqBodyDTO} from '@copor/core/client/Core/dto/GetListReqBodyDTO';

export class GetContractTypeListController extends BaseController<GetListReqBodyDTO, GetContractTypeViewModel[]> {
	async getResponse() {
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<GetContractTypeDTO[]>,
			this.getValidator(),
			this.getInteractor(),
			this.getLogger()
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		this.response.status(200);
		this.response.send(response);
	}
	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput = this.actorId;

		return container.getValidator(
			ValidateGetContractTypeList,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}
	private getInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetContractTypeListInteractorRepoPicker);

		return container.getInteractor(GetContractTypeList, interactorRepo, {filters: this.request.body.filterList});
	}
	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetContractTypeListLoggerRepoPicker);

		return container.getLogger(LogGetContractTypeList, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
