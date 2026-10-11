import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetUserGroupTreeDTO} from '@copor/core/domain/UserGroup/interactor/dto/GetUserGroupTreeDTO';
import {ValidateGetUserGroupTree} from '@copor/core/domain/UserGroup/validation/ValidateGetUserGroupTree';
import {GetUserGroupTree} from '@copor/core/domain/UserGroup/interactor/GetUserGroupTree';
import {LogGetUserGroupTree} from '@copor/core/domain/UserGroup/logger/LogGetUserGroupTree';
import {GetPermissionTreeViewModel} from '@copor/core/client/Components/Permission/GetPermissionTree/GetPermissionTreeViewModel';
import {
	GetPermissionTreeDTO,
	GetPermissionTreePresenter
} from '@copor/core/client/Components/Permission/GetPermissionTree/GetPermissionTreePresenter';
import {
	GetRoleListInteractorRepoPicker
} from '@copor/core/client/Components/Role/GetRoleList/repo/repoPicker/GetRoleListInteractorRepoPicker';
import {GetRoleList} from '@copor/core/domain/Components/Role/interactor/GetRoleList';
import {
	GetUserGroupTreeInteractorRepoPicker
} from '@copor/core/client/UserGroup/GetUserGroupTree/repo/repoPicker/GetUserGroupTreeInteractorRepoPicker';
import {
	GetUserGroupTreeLoggerRepoPicker
} from '@copor/core/client/UserGroup/GetUserGroupTree/repo/repoPicker/GetUserGroupTreeLoggerRepoPicker';

export class GetPermissionTreeController extends BaseController<GetPermissionTreeDTO, GetPermissionTreeViewModel> {
	async getResponse() {
		const container = this.container;
		const roleList = await this.getRoleListInteractor().execute();

		const factory = container.getFactory(
            RunFactory<GetUserGroupTreeDTO[]>,
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
			GetPermissionTreePresenter,
			{
				roleList: roleList,
				userGroupTree: response
			}
		);

		this.response.status(200);
		this.response.send(presenter.present());
	}
	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput = this.actorId;

		return container.getValidator(
			ValidateGetUserGroupTree,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}
	private getInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetUserGroupTreeInteractorRepoPicker);

		return container.getInteractor(GetUserGroupTree, interactorRepo, []);
	}
	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetUserGroupTreeLoggerRepoPicker);

		return container.getLogger(LogGetUserGroupTree, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}

	private getRoleListInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetRoleListInteractorRepoPicker);

		return container.getInteractor(GetRoleList, interactorRepo, []);
	}
}
