import {BaseController} from '@copor/core/client/Core/BaseController';
import {UpdateUserGroupReqBodyDTO} from './dto/UpdateUserGroupReqBodyDTO';
import {UpdateUserGroupValidatorStorageRepoPicker} from './repo/repoPicker/UpdateUserGroupValidatorStorageRepoPicker';
import {ValidateUpdateUserGroup} from '@copor/core/domain/UserGroup/validation/ValidateUpdateUserGroup';
import {UpdateUserGroupInteractorRepoPicker} from './repo/repoPicker/UpdateUserGroupInteractorRepoPicker';
import {UpdateUserGroup} from '@copor/core/domain/UserGroup/interactor/UpdateUserGroup';
import {UpdateUserGroupLoggerRepoPicker} from './repo/repoPicker/UpdateUserGroupLoggerRepoPicker';
import {
	LogDataForUpdateUserGroup, LogUpdateUserGroup
} from '@copor/core/domain/UserGroup/logger/LogUpdateUserGroup';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateUpdateUserGroupDTO} from '@copor/core/domain/UserGroup/validation/dto/ValidateUpdateUserGroupDTO';
import {UpdateUserGroupDTO} from '@copor/core/domain/UserGroup/interactor/dto/UpdateUserGroupDTO';
import {SetUserGroupUserList} from '@copor/core/domain/UserGroup/interactor/SetUserGroupUserList';
import {
	SetUserGroupUserListInteractorRepoPicker
} from '@copor/core/client/UserGroup/SetUserGroupUserList/repo/repoPicker/SetUserGroupUserListInteractorRepoPicker';

export class UpdateUserGroupController extends BaseController<UpdateUserGroupReqBodyDTO, void> {
	async getResponse() {
		const factory = this.container.getFactory(
			RunFactory,
			this.getValidator(),
			this.getInteractor(),
			this.getLogger()
		);

		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		await this.setUserGroupUserList();

		this.response.status(200);
		this.response.send(response);
	}


	async setUserGroupUserList() {
		const repo = this.container.getNewRepoPicker(SetUserGroupUserListInteractorRepoPicker);
		const interactor = this.container.getInteractor(SetUserGroupUserList, repo, {
			userGroupId: this.request.body.id,
			userList: this.request.body.userList
		});

		await interactor.execute();
	}

	private getValidator(): Validator {
		const validatorPermissionRepo = this.container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = this.container.getNewRepoPicker(
			UpdateUserGroupValidatorStorageRepoPicker
		);

		return this.container.getValidator(
			ValidateUpdateUserGroup,
			this.getValidatorInput(),
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	private getInteractor() {
		return this.container.getInteractor(
			UpdateUserGroup,
			this.container.getNewRepoPicker(UpdateUserGroupInteractorRepoPicker),
			this.getInteractorInput()
		);
	}

	private getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(UpdateUserGroupLoggerRepoPicker);
		const logData: LogDataForUpdateUserGroup = this.request.body;

		return this.container.getLogger(
			LogUpdateUserGroup,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getValidatorInput(): ValidateUpdateUserGroupDTO {
		return {
			userGroupId: this.request.body.id,
			actorId: this.actorId
		};
	}

	private getInteractorInput(): UpdateUserGroupDTO {
		return {
			id: this.request.body.id,
			name: this.request.body.name
		};
	}
}
