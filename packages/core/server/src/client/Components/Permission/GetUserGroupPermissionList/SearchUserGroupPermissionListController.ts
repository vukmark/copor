import {BaseController} from '@copor/core/client/Core/BaseController';
import {
	GetUserGroupPermissionListInteractorRepoPicker
} from './repo/repoPicker/GetUserGroupPermissionListInteractorRepoPicker';
import {
	GetUserGroupPermissionListLoggerRepoPicker
} from './repo/repoPicker/GetUserGroupPermissionListLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	ValidateGetUserGroupPermissionList
} from '@copor/core/domain/Components/Permission/validations/ValidateGetUserGroupPermissionList';
import {GetUserGroupPermissionList} from '@copor/core/domain/Components/Permission/interactor/GetUserGroupPermissionList';
import {
	LogGetUserGroupPermissionList
} from '@copor/core/domain/Components/Permission/logger/LogGetUserGroupPermissionList';
import {
	ValidateGetUserGroupPermissionListDTO
} from '@copor/core/domain/Components/Permission/validations/dto/ValidateGetUserGroupPermissionListDTO';
import {
	GetUserGroupPermissionListValidatorStorageRepoPicker
} from './repo/repoPicker/GetUserGroupPermissionListValidatorStorageRepoPicker';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';
import {
	FeatureScopedPermissionViewModel
} from '@copor/core/client/Components/Permission/GetRolePermissionList/FeatureScopedPermissionViewModel';
import {
	SearchUserGroupPermissionListReqBodyDTO
} from './dto/SearchUserGroupPermissionListReqBodyDTO';
import {PaginatedResponse} from '@copor/core/client/Core/Presenter/PaginatedResponse';
import {
	SearchUserGroupPermissionListPresenter
} from './SearchUserGroupPermissionListPresenter';

interface SearchUserGroupPermissionListParams {
	userGroupId: string;
}

export class SearchUserGroupPermissionListController
	extends BaseController<
		SearchUserGroupPermissionListReqBodyDTO,
		PaginatedResponse<FeatureScopedPermissionViewModel>
	> {
	async getResponse() {
		const userGroupId = (this.request.params as SearchUserGroupPermissionListParams).userGroupId;
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<ScopedPermission[]>,
			this.getValidator(userGroupId),
			this.getInteractor(userGroupId),
			this.getLogger(userGroupId)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		const presenter = container.getPresenter(
			SearchUserGroupPermissionListPresenter,
			{
				permissionList: response,
				filterList: this.request.body.filterList ?? []
			},
			container.appContext,
			{
				limit: this.request.body.limit,
				offset: this.request.body.offset
			}
		);

		this.response.status(200);
		this.response.send(presenter.present());
	}

	private getValidator(userGroupId: string): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = container.getNewRepoPicker(GetUserGroupPermissionListValidatorStorageRepoPicker);
		const validatorInput: ValidateGetUserGroupPermissionListDTO = {
			actorId: this.actorId,
			userGroupId
		};

		return container.getValidator(
			ValidateGetUserGroupPermissionList,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	private getInteractor(userGroupId: string) {
		const container = this.container;
		const interactorRepo = container.getNewRepoPicker(GetUserGroupPermissionListInteractorRepoPicker);

		return container.getInteractor(GetUserGroupPermissionList, interactorRepo, userGroupId);
	}

	private getLogger(userGroupId: string) {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetUserGroupPermissionListLoggerRepoPicker);

		return container.getLogger(
			LogGetUserGroupPermissionList,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			{userGroupId}
		);
	}
}
