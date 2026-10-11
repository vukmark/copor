import {BaseController} from '@copor/core/client/Core/BaseController';
import {
	GetRolePermissionListInteractorRepoPicker
} from './repo/repoPicker/GetRolePermissionListInteractorRepoPicker';
import {
	GetRolePermissionListLoggerRepoPicker
} from './repo/repoPicker/GetRolePermissionListLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetRolePermissionList} from '@copor/core/domain/Components/Permission/interactor/GetRolePermissionList';
import {LogGetRolePermissionList} from '@copor/core/domain/Components/Permission/logger/LogGetRolePermissionList';
import {ValidateGetRolePermissionList} from '@copor/core/domain/Components/Permission/validations/ValidateGetRolePermissionList';
import {
	ValidateGetRolePermissionListDTO
} from '@copor/core/domain/Components/Permission/validations/dto/ValidateGetRolePermissionListDTO';
import {
	GetRolePermissionListValidatorStorageRepoPicker
} from './repo/repoPicker/GetRolePermissionListValidatorStorageRepoPicker';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';
import {
	FeatureScopedPermissionViewModel
} from '@copor/core/client/Components/Permission/GetRolePermissionList/FeatureScopedPermissionViewModel';
import {
	SearchRolePermissionListReqBodyDTO
} from '@copor/core/client/Components/Permission/GetRolePermissionList/dto/SearchRolePermissionListReqBodyDTO';
import {PaginatedResponse} from '@copor/core/client/Core/Presenter/PaginatedResponse';
import {
	SearchRolePermissionListPresenter
} from '@copor/core/client/Components/Permission/GetRolePermissionList/SearchRolePermissionListPresenter';

interface SearchRolePermissionListParams {
	roleId: string;
}

export class SearchRolePermissionListController
	extends BaseController<
		SearchRolePermissionListReqBodyDTO,
		PaginatedResponse<FeatureScopedPermissionViewModel>
	> {
	async getResponse() {
		const roleId = (this.request.params as SearchRolePermissionListParams).roleId;
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<ScopedPermission[]>,
			this.getValidator(roleId),
			this.getInteractor(roleId),
			this.getLogger(roleId)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		const presenter = container.getPresenter(
			SearchRolePermissionListPresenter,
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

	private getValidator(roleId: string): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = container.getNewRepoPicker(GetRolePermissionListValidatorStorageRepoPicker);
		const validatorInput: ValidateGetRolePermissionListDTO = {
			actorId: this.actorId,
			roleId
		};

		return container.getValidator(
			ValidateGetRolePermissionList,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	private getInteractor(roleId: string) {
		const container = this.container;
		const interactorRepo = container.getNewRepoPicker(GetRolePermissionListInteractorRepoPicker);

		return container.getInteractor(GetRolePermissionList, interactorRepo, roleId);
	}

	private getLogger(roleId: string) {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetRolePermissionListLoggerRepoPicker);

		return container.getLogger(LogGetRolePermissionList, loggerRepo, new CreateLogDetails(this.actorId), {roleId});
	}
}
