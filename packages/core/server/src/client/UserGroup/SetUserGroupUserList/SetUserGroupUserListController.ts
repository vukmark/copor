import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	SetUserGroupUserListValidatorStorageRepoPicker
} from '@copor/core/client/UserGroup/SetUserGroupUserList/repo/repoPicker/SetUserGroupUserListValidatorStorageRepoPicker';
import {ValidateSetUserGroupUserListDTO} from '@copor/core/domain/UserGroup/validation/dto/ValidateSetUserGroupUserListDTO';
import {ValidateSetUserGroupUserList} from '@copor/core/domain/UserGroup/validation/ValidateSetUserGroupUserList';
import {SetUserGroupUserListDTO} from '@copor/core/domain/UserGroup/interactor/dto/SetUserGroupUserListDTO';
import {
	SetUserGroupUserListInteractorRepoPicker
} from '@copor/core/client/UserGroup/SetUserGroupUserList/repo/repoPicker/SetUserGroupUserListInteractorRepoPicker';
import {SetUserGroupUserList} from '@copor/core/domain/UserGroup/interactor/SetUserGroupUserList';
import {
	SetUserGroupUserListLoggerRepoPicker
} from '@copor/core/client/UserGroup/SetUserGroupUserList/repo/repoPicker/SetUserGroupUserListLoggerRepoPicker';
import {
	LogDataForSetUserGroupUserList,
	LogSetUserGroupUserList
} from '@copor/core/domain/UserGroup/logger/LogSetUserGroupUserList';
import {
	SetUserGroupUserListReqBodyDTO
} from '@copor/core/client/UserGroup/SetUserGroupUserList/dto/SetUserGroupUserListReqBodyDTO';

export class SetUserGroupUserListController extends BaseController<SetUserGroupUserListReqBodyDTO, void> {
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
		const validatorStorageRepo = container.getNewRepoPicker(SetUserGroupUserListValidatorStorageRepoPicker);
		const validatorInput: ValidateSetUserGroupUserListDTO = {
			... this.request.body,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateSetUserGroupUserList,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	private getInteractor() : UseCase<void> {
		const container = this.container;
		const interactorInput: SetUserGroupUserListDTO = {
			... this.request.body
		};
		const interactorRepo = container.getNewRepoPicker(SetUserGroupUserListInteractorRepoPicker);

		return container.getInteractor(
			SetUserGroupUserList,
			interactorRepo,
			interactorInput
		);
	}

	private getLogger() : LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(SetUserGroupUserListLoggerRepoPicker);
		const logData = this.getLogData();

		return container.getLogger(
			LogSetUserGroupUserList,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getLogData(): LogDataForSetUserGroupUserList {
		return {
			... this.request.body
		};
	}
}
