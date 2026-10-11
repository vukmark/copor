import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetFormViewModel} from '@copor/core/client/Core/Form/GetFormViewModel';
import {
	GetUserGroupUserListInteractorRepoPicker
} from '@copor/core/client/UserGroup/GetUpdateUserGroupForm/repo/repoPicker/GetUserGroupUserListInteractorRepoPicker';
import {GetUserGroupUserList} from '@copor/core/domain/UserGroup/interactor/GetUserGroupUserList';
import {ValidateGetUserGroupDTO} from '@copor/core/domain/UserGroup/validation/dto/ValidateGetUserGroupDTO';
import {ValidateGetUserGroup} from '@copor/core/domain/UserGroup/validation/ValidateGetUserGroup';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	GetUserGroupValidatorStorageRepoPicker
} from '@copor/core/client/UserGroup/GetUserGroup/repo/repoPicker/GetUserGroupValidatorStorageRepoPicker';
import {
	GetUserGroupLoggerRepoPicker
} from '@copor/core/client/UserGroup/GetUserGroup/repo/repoPicker/GetUserGroupLoggerRepoPicker';
import {LogGetUserGroup} from '@copor/core/domain/UserGroup/logger/LogGetUserGroup';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {
	GetUserGroupInteractorRepoPicker
} from '@copor/core/client/UserGroup/GetUserGroup/repo/repoPicker/GetUserGroupInteractorRepoPicker';
import {GetUserGroup} from '@copor/core/domain/UserGroup/interactor/GetUserGroup';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {GetUserGroupDTO} from '@copor/core/domain/UserGroup/interactor/dto/GetUserGroupDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {
	GetUpdateUserGroupFormPresenter
} from '@copor/core/client/UserGroup/GetUpdateUserGroupForm/GetUpdateUserGroupFormPresenter';
import {ListItemsByIdDTO} from '@copor/core/domain/Core/Interactors/ListItemsByIdUseCase';

export interface GetUpdateUserGroupParams {
	id: string;
}
export class GetUpdateUserGroupFormController extends BaseController<undefined, GetFormViewModel> {
	public async getResponse() {
		const params = this.request.params as GetUpdateUserGroupParams;
		const id: string = params.id;
		const actorId = this.actorId;

		const factory = this.container.getFactory(
            RunFactory<GetUserGroupDTO>,
            this.getValidator(actorId, id),
            this.getInteractor(id),
            this.getLogger(actorId, id)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const userList = await this.getUserGroupUserListInteractor(id).execute();
		const presenter = this.container.getPresenter(GetUpdateUserGroupFormPresenter,
			{
				userGroup: response,
				userList: userList
			});
		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}
	private getUserGroupUserListInteractor(id: string) {
		const repo = this.container.getNewRepoPicker(GetUserGroupUserListInteractorRepoPicker);
		const interactorInput: ListItemsByIdDTO = {
			id,
			filters: []
		};

		return this.container.getInteractor(GetUserGroupUserList, repo, interactorInput);
	}

	private getValidator(actorId: string, id: string) {
		const c = this.container;
		const validatorInput: ValidateGetUserGroupDTO = {
			userGroupId: id,
			actorId: this.actorId
		};

		return c.getValidator(
			ValidateGetUserGroup,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetUserGroupValidatorStorageRepoPicker)
		);
	}

	private getLogger(actorId: string, id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetUserGroupLoggerRepoPicker);
		const logData = {
			id: id
		};

		return this.container.getLogger(
			LogGetUserGroup,
			loggerRepository,
			new CreateLogDetails(actorId),
			logData
		);
	}

	private getInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetUserGroupInteractorRepoPicker);

		return this.container.getInteractor(
			GetUserGroup,
			interactorRepository,
			id
		);
	}
}