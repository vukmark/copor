import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetUserGroupPermissionListInteractorRepoPicker} from './repo/repoPicker/GetUserGroupPermissionListInteractorRepoPicker';
import {GetUserGroupPermissionListLoggerRepoPicker} from './repo/repoPicker/GetUserGroupPermissionListLoggerRepoPicker';
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
	GetUserGroupPermissionListPresenter
} from '@copor/core/client/Components/Permission/GetUserGroupPermissionList/GetUserGroupPermissionListPresenter';

interface GetUserPermissionListReqBody {
	userGroupId: string;
}

export class GetUserGroupPermissionListController extends BaseController<void, FeatureScopedPermissionViewModel[]> {
	async getResponse() {
		const params = this.request.params as GetUserPermissionListReqBody;
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<ScopedPermission[]>,
			this.getValidator(params.userGroupId),
			this.getInteractor(params.userGroupId),
			this.getLogger(params.userGroupId)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = container.getPresenter(
			GetUserGroupPermissionListPresenter,
			response,
			container.appContext
		);


		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}
	private getValidator(userId: string): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = container.getNewRepoPicker(GetUserGroupPermissionListValidatorStorageRepoPicker);

		const validatorInput: ValidateGetUserGroupPermissionListDTO = {
			actorId: this.actorId,
			userGroupId: userId
		};

		return container.getValidator(
			ValidateGetUserGroupPermissionList,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}
	private getInteractor(userId: string) {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetUserGroupPermissionListInteractorRepoPicker);

		return container.getInteractor(GetUserGroupPermissionList, interactorRepo, userId);
	}
	private getLogger(userGroupId: string) {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetUserGroupPermissionListLoggerRepoPicker);

		return container.getLogger(LogGetUserGroupPermissionList, loggerRepo, new CreateLogDetails(this.actorId), {userGroupId});
	}
}
