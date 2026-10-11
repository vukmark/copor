import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetUserSpecificPermissionListInteractorRepoPicker} from './repo/repoPicker/GetUserSpecificPermissionListInteractorRepoPicker';
import {GetUserSpecificPermissionListLoggerRepoPicker} from './repo/repoPicker/GetUserSpecificPermissionListLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	ValidateGetUserSpecificPermissionList
} from '@copor/core/domain/Components/Permission/validations/ValidateGetUserSpecificPermissionList';
import {GetUserSpecificPermissionList} from '@copor/core/domain/Components/Permission/interactor/GetUserSpecificPermissionList';
import {
	LogGetUserSpecificPermissionList
} from '@copor/core/domain/Components/Permission/logger/LogGetUserSpecificPermissionList';
import {
	ValidateGetUserSpecificPermissionListDTO
} from '@copor/core/domain/Components/Permission/validations/dto/ValidateGetUserSpecificPermissionListDTO';
import {
	GetUserSpecificPermissionListValidatorStorageRepoPicker
} from './repo/repoPicker/GetUserSpecificPermissionListValidatorStorageRepoPicker';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';
import {
	GetUserSpecificPermissionListPresenter
} from '@copor/core/client/Components/Permission/GetUserSpecificPermissionList/GetUserSpecificPermissionListPresenter';
import {
	FeatureScopedPermissionViewModel
} from '@copor/core/client/Components/Permission/GetRolePermissionList/FeatureScopedPermissionViewModel';

interface GetUserPermissionListReqBody {
	userId: string;
}

export class GetUserSpecificPermissionListController extends BaseController<void, FeatureScopedPermissionViewModel[]> {
	async getResponse() {
		const params = this.request.params as GetUserPermissionListReqBody;
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<ScopedPermission[]>,
			this.getValidator(params.userId),
			this.getInteractor(params.userId),
			this.getLogger(params.userId)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		const presenter = container.getPresenter(
			GetUserSpecificPermissionListPresenter,
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
		const validatorStorageRepo = container.getNewRepoPicker(GetUserSpecificPermissionListValidatorStorageRepoPicker);

		const validatorInput: ValidateGetUserSpecificPermissionListDTO = {
			actorId: this.actorId,
			userId: userId
		};

		return container.getValidator(
			ValidateGetUserSpecificPermissionList,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}
	private getInteractor(userId: string) {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetUserSpecificPermissionListInteractorRepoPicker);

		return container.getInteractor(GetUserSpecificPermissionList, interactorRepo, userId);
	}
	private getLogger(userId: string) {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetUserSpecificPermissionListLoggerRepoPicker);

		return container.getLogger(LogGetUserSpecificPermissionList, loggerRepo, new CreateLogDetails(this.actorId), {userId});
	}
}
