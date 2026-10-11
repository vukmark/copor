import {BaseController} from '@copor/core/client/Core/BaseController';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	ValidateGetAllPermissionsForUser
} from '@copor/core/domain/Components/Permission/validations/ValidateGetAllPermissionsForUser';
import {
	GetUserCompletePermissionListInteractorRepoPicker
} from '@copor/core/client/Components/Permission/GetUserCompletePermissionList/repo/repoPicker/GetUserCompletePermissionListInteractorRepoPicker';
import {
	GetUserCompletePermissionListLoggerRepoPicker
} from '@copor/core/client/Components/Permission/GetUserCompletePermissionList/repo/repoPicker/GetUserCompletePermissionListLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {GetAllPermissionsForUser} from '@copor/core/domain/Components/Permission/interactor/GetAllPermissionsForUser';
import {LogGetAllPermissionsForUser} from '@copor/core/domain/Components/Permission/logger/LogGetAllPermissionsForUser';
import {
	GetUserCompletePermissionListPresenter
} from '@copor/core/client/Components/Permission/GetUserCompletePermissionList/GetUserCompletePermissionListPresenter';
import {
	FeatureScopedPermissionViewModel
} from '@copor/core/client/Components/Permission/GetRolePermissionList/FeatureScopedPermissionViewModel';


export class GetUserCompletePermissionListController extends BaseController<void, FeatureScopedPermissionViewModel[]> {
	async getResponse() {
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<ScopedPermission[]>,
			this.getValidator(),
			this.getInteractor(),
			this.getLogger()
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = container.getPresenter(
			GetUserCompletePermissionListPresenter,
			response,
			container.appContext
		);


		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}
	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);

		return container.getValidator(
			ValidateGetAllPermissionsForUser,
			{
				userId: this.actorId,
				actorId: this.actorId
			},
			validatorPermissionRepo,
			undefined
		);
	}
	private getInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetUserCompletePermissionListInteractorRepoPicker);

		return container.getInteractor(GetAllPermissionsForUser, interactorRepo, this.actorId);
	}
	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetUserCompletePermissionListLoggerRepoPicker);

		return container.getLogger(LogGetAllPermissionsForUser, loggerRepo, new CreateLogDetails(this.actorId), {userId: this.actorId});
	}
}
