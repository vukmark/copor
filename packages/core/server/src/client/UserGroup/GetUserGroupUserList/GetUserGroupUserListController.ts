import {BaseController} from '@copor/core/client/Core/BaseController';
import {ValidateGetUserGroupDTO} from '@copor/core/domain/UserGroup/validation/dto/ValidateGetUserGroupDTO';
import {ValidateGetUserGroup} from '@copor/core/domain/UserGroup/validation/ValidateGetUserGroup';
import {GetUserGroupUserListDTO} from '@copor/core/domain/UserGroup/interactor/dto/GetUserGroupUserListDTO';
import {GetUserGroupUserList} from '@copor/core/domain/UserGroup/interactor/GetUserGroupUserList';
import {LogGetUserGroup} from '@copor/core/domain/UserGroup/logger/LogGetUserGroup';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	GetUserGroupValidatorStorageRepoPicker
} from '@copor/core/client/UserGroup/GetUserGroup/repo/repoPicker/GetUserGroupValidatorStorageRepoPicker';
import {
	GetUserGroupLoggerRepoPicker
} from '@copor/core/client/UserGroup/GetUserGroup/repo/repoPicker/GetUserGroupLoggerRepoPicker';
import {
	GetUserGroupUserListInteractorRepoPicker
} from '@copor/core/client/UserGroup/GetUpdateUserGroupForm/repo/repoPicker/GetUserGroupUserListInteractorRepoPicker';
import {GetUserGroupUserListPresenter} from '@copor/core/client/UserGroup/GetUserGroupUserList/GetUserGroupUserListPresenter';
import {GetUserGroupUserListViewModel} from '@copor/core/client/UserGroup/GetUserGroupUserList/GetUserGroupUserListViewModel';
import {
	GetUserGroupUserListReqBodyDTO
} from '@copor/core/client/UserGroup/GetUserGroupUserList/dto/GetUserGroupUserListReqBodyDTO';
import {PaginationParams} from '@copor/core/client/Core/Presenter/PaginationParams';
import {PaginatedResponse} from '@copor/core/client/Core/Presenter/PaginatedResponse';
import {ListItemsByIdDTO} from '@copor/core/domain/Core/Interactors/ListItemsByIdUseCase';

export class GetUserGroupUserListController
	extends BaseController<GetUserGroupUserListReqBodyDTO, PaginatedResponse<GetUserGroupUserListViewModel>> {
	async getResponse() {
		const container = this.container;
		const userGroupId = this.request.body.userGroupId;

		const factory = container.getFactory(
			RunFactory<GetUserGroupUserListDTO[]>,
			this.getValidator(userGroupId),
			this.getInteractor(userGroupId),
			this.getLogger(userGroupId)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		const paginationParams: PaginationParams = {
			limit: this.request.body.limit,
			offset: this.request.body.offset
		};

		const presenter = container.getPresenter(
			GetUserGroupUserListPresenter,
			response,
			container.appContext,
			paginationParams
		);

		this.response.status(200);
		this.response.send(presenter.present());
	}

	private getValidator(userGroupId: string) {
		const container = this.container;
		const validatorInput: ValidateGetUserGroupDTO = {
			userGroupId,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateGetUserGroup,
			validatorInput,
			container.getNewRepoPicker(PermissionValidatorRepoPicker),
			container.getNewRepoPicker(GetUserGroupValidatorStorageRepoPicker)
		);
	}

	private getInteractor(userGroupId: string) {
		const container = this.container;
		const interactorRepo = container.getNewRepoPicker(GetUserGroupUserListInteractorRepoPicker);
		const interactorInput: ListItemsByIdDTO = {
			id: userGroupId,
			filters: [],
			actorId: this.actorId,
			limit: this.request.body.limit,
			offset: this.request.body.offset
		};

		return container.getInteractor(
			GetUserGroupUserList,
			interactorRepo,
			interactorInput
		);
	}

	private getLogger(userGroupId: string) {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetUserGroupLoggerRepoPicker);

		return container.getLogger(
			LogGetUserGroup,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			{id: userGroupId}
		);
	}
}
