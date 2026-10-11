import {BaseController} from '../../Core/BaseController';
import {SignContractReqBodyDTO} from './dto/SignContractReqBodyDTO';
import {SignContractValidatorStorageRepoPicker} from './repo/repoPicker/SignContractValidatorStorageRepoPicker';
import {SignContractInteractorRepoPicker} from './repo/repoPicker/SignContractInteractorRepoPicker';
import {SignContractLoggerRepoPicker} from './repo/repoPicker/SignContractLoggerRepoPicker';
import {CreateLogDetails} from '../../GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {IdGenerator} from '../../Core/IdGenerator/IdGenerator';
import {ValidateSignContractDTO} from '@copor/core/domain/Contract/validation/dto/ValidateSignContractDTO';
import {ValidateSignContract} from '@copor/core/domain/Contract/validation/ValidateSignContract';
import {SignContractDTO} from '@copor/core/domain/Contract/interactor/dto/SignContractDTO';
import {SignContract} from '@copor/core/domain/Contract/interactor/SignContract';
import {LogDataForSignContract, LogSignContract} from '@copor/core/domain/Contract/logger/LogSignContract';
import {SignContractValidatorPermissionRepoPicker}
	from '@copor/core/client/Contract/SignContract/repo/repoPicker/SignContractValidatorPermissionRepoPicker';

export class SignContractController extends BaseController<SignContractReqBodyDTO, void> {
	async getResponse() {
		const container = this.container;

		const factory = container.getFactory(
			RunFactory<void>,
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
		this.response.send();
	}

	private async getUniqueId(): Promise<string> {
		const uniqueIdGenerator = this.container.getRepository(IdGenerator);

		return await uniqueIdGenerator.getNewId();
	}

	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(SignContractValidatorPermissionRepoPicker);
		const validatorStorageRepo = container.getNewRepoPicker(SignContractValidatorStorageRepoPicker);
		const validatorInput: ValidateSignContractDTO = {
			... this.request.body,
			actorId: this.request.body.userId
		};

		return container.getValidator(
			ValidateSignContract,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	private getInteractor() : UseCase<void> {
		const container = this.container;
		const interactorInput: SignContractDTO = {
			... this.request.body
		};
		const interactorRepo = container.getNewRepoPicker(SignContractInteractorRepoPicker);

		return container.getInteractor(
			SignContract,
			interactorRepo,
			interactorInput
		);
	}

	private getLogger() : LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(SignContractLoggerRepoPicker);
		const logData = this.getLogData();

		return container.getLogger(
			LogSignContract,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getLogData(): LogDataForSignContract {
		return {
			... this.request.body
		};
	}
}
