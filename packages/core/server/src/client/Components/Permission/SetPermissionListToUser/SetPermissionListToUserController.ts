import {BaseController} from '@copor/core/client/Core/BaseController';
import {SetPermissionListToUserReqBodyDTO} from './dto/SetPermissionListToUserReqBodyDTO';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {SetPermissionListToUserValidatorStorageRepoPicker} from './repo/repoPicker/SetPermissionListToUserValidatorStorageRepoPicker';
import {SetPermissionListToUserInteractorRepoPicker} from './repo/repoPicker/SetPermissionListToUserInteractorRepoPicker';
import {SetPermissionListToUserLoggerRepoPicker} from './repo/repoPicker/SetPermissionListToUserLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {SetPermissionListToUserDTO} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToUserDTO';
import {ValidateSetPermissionListToUser} from '@copor/core/domain/Components/Permission/validations/ValidateSetPermissionListToUser';
import {SetPermissionListToUser} from '@copor/core/domain/Components/Permission/interactor/SetPermissionListToUser';
import {LogSetPermissionListToUser} from '@copor/core/domain/Components/Permission/logger/LogSetPermissionListToUser';

export class SetPermissionListToUserController extends BaseController<SetPermissionListToUserReqBodyDTO, void> {
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
		this.response.send(response);
	}

	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = container.getNewRepoPicker(SetPermissionListToUserValidatorStorageRepoPicker);
		const validatorInput: SetPermissionListToUserDTO = {
			... this.request.body,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateSetPermissionListToUser,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	private getInteractor() : UseCase<void> {
		const container = this.container;
		const interactorInput: SetPermissionListToUserDTO = {
			... this.request.body,
			actorId: this.actorId
		};
		const interactorRepo = container.getNewRepoPicker(SetPermissionListToUserInteractorRepoPicker);

		return container.getInteractor(
			SetPermissionListToUser,
			interactorRepo,
			interactorInput
		);
	}

	private getLogger() : LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(SetPermissionListToUserLoggerRepoPicker);
		const logData = this.request.body;

		return container.getLogger(
			LogSetPermissionListToUser,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}
}
