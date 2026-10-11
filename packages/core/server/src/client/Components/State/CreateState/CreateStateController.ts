import {ValidateCreateState} from '@copor/core/domain/Components/State/validations/ValidateCreateState';
import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateStateReqBodyDTO} from './dto/CreateStateReqBodyDTO';
import {CreateStateValidatorStorageRepoPicker} from './repo/repoPicker/CreateStateValidatorStorageRepoPicker';
import {SaveStateDTO} from '@copor/core/domain/Components/State/interactor/dto/SaveStateDTO';
import {CreateStateInteractorRepoPicker} from './repo/repoPicker/CreateStateInteractorRepoPicker';
import {CreateState} from '@copor/core/domain/Components/State/interactor/CreateState';
import {CreateStateLoggerRepoPicker} from './repo/repoPicker/CreateStateLoggerRepoPicker';
import {LogCreateState, LogDataForCreateState} from '@copor/core/domain/Components/State/logger/LogCreateState';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ValidateCreateStateDTO} from '@copor/core/domain/Components/State/validations/dto/ValidateCreateStateDTO';
import {IdGenerator} from '@copor/core/client/Core/IdGenerator/IdGenerator';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';

export class CreateStateController extends BaseController<CreateStateReqBodyDTO, string> {
	async getResponse() {
		const uniqueId = await this.getUniqueId();
		const container = this.container;

		const factory = container.getFactory(
			RunFactory<string>,
			this.getValidator(),
			this.getInteractor(uniqueId),
			this.getLogger(uniqueId)
		);

		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		this.response.status(200);
		this.response.send(response);
	}

	private async getUniqueId(): Promise<string> {
		const uniqueIdGenerator = this.container.getRepository(IdGenerator);

		return await uniqueIdGenerator.getNewId();
	}

	private getValidator(): Validator {
		const container = this.container;
		const validatorStorageRepo = container.getNewRepoPicker(CreateStateValidatorStorageRepoPicker);
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput: ValidateCreateStateDTO = {
			... this.request.body,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateCreateState,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	private getInteractor(uniqueId: string) : UseCase<string> {
		const container = this.container;
		const interactorInput: SaveStateDTO = {
			... this.request.body,
			actorId: this.actorId,
			id: uniqueId
		};
		const interactorRepo = container.getNewRepoPicker(CreateStateInteractorRepoPicker);

		return container.getInteractor(
			CreateState,
			interactorRepo,
			interactorInput
		);
	}

	private getLogger(uniqueId: string) : LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(CreateStateLoggerRepoPicker);
		const logData = this.getLogData(uniqueId);

		return container.getLogger(
			LogCreateState,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getLogData(uniqueId: string): LogDataForCreateState {
		return {
			... this.request.body,
			id: uniqueId
		};
	}
}
