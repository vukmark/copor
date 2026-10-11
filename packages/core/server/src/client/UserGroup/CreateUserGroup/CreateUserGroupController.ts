import {BaseController} from '@copor/core/client/Core/BaseController';
import {
	CreateUserGroupReqBodyDTO
} from '@copor/core/client/UserGroup/CreateUserGroup/dto/CreateUserGroupReqBodyDTO';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {IdGenerator} from '@copor/core/client/Core/IdGenerator/IdGenerator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	CreateUserGroupValidatorStorageRepoPicker
} from '@copor/core/client/UserGroup/CreateUserGroup/repo/repoPicker/CreateUserGroupValidatorStorageRepoPicker';
import {
	ValidateCreateUserGroupDTO
} from '@copor/core/domain/UserGroup/validation/dto/ValidateCreateUserGroupDTO';
import {ValidateCreateUserGroup} from '@copor/core/domain/UserGroup/validation/ValidateCreateUserGroup';
import {SaveUserGroupDTO} from '@copor/core/domain/UserGroup/interactor/dto/SaveUserGroupDTO';
import {
	CreateUserGroupInteractorRepoPicker
} from '@copor/core/client/UserGroup/CreateUserGroup/repo/repoPicker/CreateUserGroupInteractorRepoPicker';
import {CreateUserGroup} from '@copor/core/domain/UserGroup/interactor/CreateUserGroup';
import {
	CreateUserGroupLoggerRepoPicker
} from '@copor/core/client/UserGroup/CreateUserGroup/repo/repoPicker/CreateUserGroupLoggerRepoPicker';
import {
	LogCreateUserGroup,
	LogDataForCreateUserGroup
} from '@copor/core/domain/UserGroup/logger/LogCreateUserGroup';
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

export class CreateUserGroupController extends BaseController<CreateUserGroupReqBodyDTO, string> {
	async getResponse() {
		const container = this.container;
		const uniqueId = await this.getUniqueId();

		const factory = container.getFactory(
			RunFactory<string>,
			this.getCreateUserGroupValidator(),
			this.getCreateUserGroupInteractor(uniqueId),
			this.getCreateUserGroupLogger(uniqueId)
		);

		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		if (this.request.body.userList.length > 0) {
			const setUserListFactory = container.getFactory(
				RunFactory<void>,
				this.getSetUserListValidator(uniqueId),
				this.getSetUserListInteractor(uniqueId),
				this.getSetUserListLogger(uniqueId)
			);

			const setUserListResponse = await setUserListFactory.run();

			if (setUserListResponse instanceof ErrorList) {
				this.next(setUserListResponse);
				return;
			}
		}

		this.response.status(200);
		this.response.send(response);
	}

	private async getUniqueId(): Promise<string> {
		const uniqueIdGenerator = this.container.getRepository(IdGenerator);

		return await uniqueIdGenerator.getNewId();
	}

	private getCreateUserGroupValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = container.getNewRepoPicker(CreateUserGroupValidatorStorageRepoPicker);
		const validatorInput: ValidateCreateUserGroupDTO = {
			... this.request.body,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateCreateUserGroup,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	private getCreateUserGroupInteractor(uniqueId: string) : UseCase<string> {
		const container = this.container;
		const interactorInput: SaveUserGroupDTO = {
			id: uniqueId,
			name: this.request.body.name,
			parentUserGroupId: this.request.body.parentUserGroupId
		};
		const interactorRepo = container.getNewRepoPicker(CreateUserGroupInteractorRepoPicker);

		return container.getInteractor(
			CreateUserGroup,
			interactorRepo,
			interactorInput
		);
	}

	private getCreateUserGroupLogger(uniqueId: string) : LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(CreateUserGroupLoggerRepoPicker);
		const logData = this.getCreateUserGroupLogData(uniqueId);

		return container.getLogger(
			LogCreateUserGroup,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getCreateUserGroupLogData(uniqueId: string): LogDataForCreateUserGroup {
		return {
			... this.request.body,
			id: uniqueId
		};
	}


	private getSetUserListValidator(groupId: string): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = container.getNewRepoPicker(SetUserGroupUserListValidatorStorageRepoPicker);
		const validatorInput: ValidateSetUserGroupUserListDTO = {
			... this.request.body,
			actorId: this.actorId,
			userGroupId: groupId
		};

		return container.getValidator(
			ValidateSetUserGroupUserList,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	private getSetUserListInteractor(groupId: string) : UseCase<void> {
		const container = this.container;
		const interactorInput: SetUserGroupUserListDTO = {
			userGroupId: groupId,
			userList: this.request.body.userList
		};
		const interactorRepo = container.getNewRepoPicker(SetUserGroupUserListInteractorRepoPicker);

		return container.getInteractor(
			SetUserGroupUserList,
			interactorRepo,
			interactorInput
		);
	}

	private getSetUserListLogger(groupId: string) : LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(SetUserGroupUserListLoggerRepoPicker);
		const logData = this.getSetUserListLogData(groupId);

		return container.getLogger(
			LogSetUserGroupUserList,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getSetUserListLogData(groupId: string): LogDataForSetUserGroupUserList {
		return {
			... this.request.body,
			userGroupId: groupId
		};
	}
}
