import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	AddUserToUserGroupValidatorStorageRepoPicker
} from '@copor/core/client/UserGroup/AddUserToUserGroup/repo/repoPicker/AddUserToUserGroupValidatorStorageRepoPicker';
import {ValidateAddUserToUserGroupDTO} from '@copor/core/domain/UserGroup/validation/dto/ValidateAddUserToUserGroupDTO';
import {ValidateAddUserToUserGroup} from '@copor/core/domain/UserGroup/validation/ValidateAddUserToUserGroup';
import {AddUserToUserGroupDTO} from '@copor/core/domain/UserGroup/interactor/dto/AddUserToUserGroupDTO';
import {
	AddUserToUserGroupInteractorRepoPicker
} from '@copor/core/client/UserGroup/AddUserToUserGroup/repo/repoPicker/AddUserToUserGroupInteractorRepoPicker';
import {AddUserToUserGroup} from '@copor/core/domain/UserGroup/interactor/AddUserToUserGroup';
import {
	AddUserToUserGroupLoggerRepoPicker
} from '@copor/core/client/UserGroup/AddUserToUserGroup/repo/repoPicker/AddUserToUserGroupLoggerRepoPicker';
import {LogAddUserToUserGroup, LogDataForAddUserToUserGroup} from '@copor/core/domain/UserGroup/logger/LogAddUserToUserGroup';

interface AddUserToUserGroupReqBodyDTO {
	userId: string;
	userGroupId: string;
}

export class AddUserToUserGroupController extends BaseController<AddUserToUserGroupReqBodyDTO, void> {
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
		const validatorStorageRepo = container.getNewRepoPicker(AddUserToUserGroupValidatorStorageRepoPicker);
		const validatorInput: ValidateAddUserToUserGroupDTO = {
			... this.request.body,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateAddUserToUserGroup,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	private getInteractor() : UseCase<void> {
		const container = this.container;
		const interactorInput: AddUserToUserGroupDTO = {
			userId: this.request.body.userId,
			userGroupId: this.request.body.userGroupId
		};
		const interactorRepo = container.getNewRepoPicker(AddUserToUserGroupInteractorRepoPicker);

		return container.getInteractor(
			AddUserToUserGroup,
			interactorRepo,
			interactorInput
		);
	}

	private getLogger() : LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(AddUserToUserGroupLoggerRepoPicker);
		const logData = this.getLogData();

		return container.getLogger(
			LogAddUserToUserGroup,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getLogData(): LogDataForAddUserToUserGroup {
		return {
			... this.request.body
		};
	}
}
