import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	DeleteUserGroupValidatorStorageRepoPicker
} from '@copor/core/client/UserGroup/DeleteUserGroup/repo/repoPicker/DeleteUserGroupValidatorStorageRepoPicker';
import {
	ValidateDeleteUserGroupDTO
} from '@copor/core/domain/UserGroup/validation/dto/ValidateDeleteUserGroupDTO';
import {ValidateDeleteUserGroup} from '@copor/core/domain/UserGroup/validation/ValidateDeleteUserGroup';
import {
	DeleteUserGroupInteractorRepoPicker
} from '@copor/core/client/UserGroup/DeleteUserGroup/repo/repoPicker/DeleteUserGroupInteractorRepoPicker';
import {DeleteUserGroup} from '@copor/core/domain/UserGroup/interactor/DeleteUserGroup';
import {
	DeleteUserGroupLoggerRepoPicker
} from '@copor/core/client/UserGroup/DeleteUserGroup/repo/repoPicker/DeleteUserGroupLoggerRepoPicker';
import {
	LogDeleteUserGroup
} from '@copor/core/domain/UserGroup/logger/LogDeleteUserGroup';
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

export interface DeleteUserGroupParams {
	id: string;
}

export class DeleteUserGroupController extends BaseController<void, void> {
	async getResponse() {
		const params = this.request.params as DeleteUserGroupParams;
		const id: string = params.id;
		const deleteValidator = this.getValidator(id);


		const validatorResponse = await deleteValidator.validate();

		if (validatorResponse instanceof ErrorList) {
			this.next(validatorResponse);
			return;
		}

		const setUserListFactory = this.container.getFactory(
			RunFactory<void>,
			this.getSetUserListValidator(id),
			this.getSetUserListInteractor(id),
			this.getSetUserListLogger(id)
		);

		const setUserListResponse = await setUserListFactory.run();

		if (setUserListResponse instanceof ErrorList) {
			this.next(setUserListResponse);
			return;
		}

		const factory = this.container.getFactory(
			RunFactory<void>,
			this.getValidator(id),
			this.getInteractor(id),
			this.getLogger(id)
		);

		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		this.response.status(200);
		this.response.send();
	}

	private getValidator(id: string) : Validator {
		const container = this.container;
		const input: ValidateDeleteUserGroupDTO = {
			actorId: this.actorId,
			userGroupId: id
		};

		return container.getValidator(
			ValidateDeleteUserGroup,
			input,
			container.getNewRepoPicker(PermissionValidatorRepoPicker),
			container.getNewRepoPicker(DeleteUserGroupValidatorStorageRepoPicker)
		);
	}

	private getInteractor(id: string) : UseCase<void> {
		const container = this.container;
		const repo = container.getNewRepoPicker(DeleteUserGroupInteractorRepoPicker);

		return container.getInteractor(DeleteUserGroup, repo, id);
	}

	private getLogger(id: string) : LogAction {
		return this.container.getLogger(
			LogDeleteUserGroup,
			this.container.getNewRepoPicker(DeleteUserGroupLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{id: id}
		);
	}
	private getSetUserListValidator(groupId: string): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = container.getNewRepoPicker(SetUserGroupUserListValidatorStorageRepoPicker);
		const validatorInput: ValidateSetUserGroupUserListDTO = {
			actorId: this.actorId,
			userGroupId: groupId,
			userList: []
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
			userList: []
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
			userGroupId: groupId,
			userList: []
		};
	}
}
