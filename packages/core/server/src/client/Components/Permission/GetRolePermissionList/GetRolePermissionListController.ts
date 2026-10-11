import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetRolePermissionListInteractorRepoPicker} from './repo/repoPicker/GetRolePermissionListInteractorRepoPicker';
import {GetRolePermissionListLoggerRepoPicker} from './repo/repoPicker/GetRolePermissionListLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetRolePermissionList} from '@copor/core/domain/Components/Permission/interactor/GetRolePermissionList';
import {
	LogGetRolePermissionList
} from '@copor/core/domain/Components/Permission/logger/LogGetRolePermissionList';
import {
	ValidateGetRolePermissionList
} from '@copor/core/domain/Components/Permission/validations/ValidateGetRolePermissionList';
import {
	ValidateGetRolePermissionListDTO
} from '@copor/core/domain/Components/Permission/validations/dto/ValidateGetRolePermissionListDTO';
import {
	GetRolePermissionListValidatorStorageRepoPicker
} from './repo/repoPicker/GetRolePermissionListValidatorStorageRepoPicker';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';
import {FeatureScopedPermissionViewModel} from '@copor/core/client/Components/Permission/GetRolePermissionList/FeatureScopedPermissionViewModel';
import {
	GetRolePermissionListPresenter
} from '@copor/core/client/Components/Permission/GetRolePermissionList/GetRolePermissionListPresenter';

interface GetRolePermissionListParams {
	roleId: string;
}

export class GetRolePermissionListController extends BaseController<void, FeatureScopedPermissionViewModel[]> {
	async getResponse() {
		const params = this.request.params as GetRolePermissionListParams;
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<ScopedPermission[]>,
			this.getValidator(params.roleId),
			this.getInteractor(params.roleId),
			this.getLogger(params.roleId)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		const presenter = container.getPresenter(
			GetRolePermissionListPresenter,
			response,
			container.appContext
		);


		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}
	private getValidator(roleId: string): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = container.getNewRepoPicker(GetRolePermissionListValidatorStorageRepoPicker);
		const validatorInput: ValidateGetRolePermissionListDTO = {
			actorId: this.actorId,
			roleId: roleId
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
		const interactorRepo = this.container.getNewRepoPicker(GetRolePermissionListInteractorRepoPicker);

		return container.getInteractor(GetRolePermissionList, interactorRepo, roleId);
	}
	private getLogger(roleId: string) {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetRolePermissionListLoggerRepoPicker);

		return container.getLogger(LogGetRolePermissionList, loggerRepo, new CreateLogDetails(this.actorId), {roleId});
	}
}
