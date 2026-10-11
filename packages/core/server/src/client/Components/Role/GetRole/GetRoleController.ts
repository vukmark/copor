import {ValidateGetRole} from '@copor/core/domain/Components/Role/validations/ValidateGetRole';
import {GetRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/GetRoleDTO';
import {GetRole} from '@copor/core/domain/Components/Role/interactor/GetRole';
import {LogGetRole} from '@copor/core/domain/Components/Role/logger/LogGetRole';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {GetRoleViewModel} from './GetRoleViewModel';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetRoleValidatorStorageRepoPicker} from './repo/repoPicker/GetRoleValidatorStorageRepoPicker';
import {GetRoleInteractorRepoPicker} from './repo/repoPicker/GetRoleInteractorRepoPicker';
import {GetRoleLoggerRepoPicker} from './repo/repoPicker/GetRoleLoggerRepoPicker';
import {GetRolePresenter} from './GetRolePresenter';
import {ValidateGetRoleInputDTO} from '@copor/core/domain/Components/Role/validations/dto/ValidateGetRoleInputDTO';
import {SingleItemBaseController} from '@copor/core/client/Core/Controller/SingleItemBaseController';
import {Presenter} from '@copor/core/client/Interface/Presenter';


export class GetRoleController extends SingleItemBaseController<GetRoleDTO, GetRoleViewModel> {
	protected getPresenter(response: GetRoleDTO): Presenter<GetRoleViewModel> {
		return this.container.getPresenter(GetRolePresenter, response);
	}

	protected getValidator(id: string) {
		const c = this.container;
		const validatorInput: ValidateGetRoleInputDTO = {actorId: this.actorId, roleId: id};

		return c.getValidator(
			ValidateGetRole,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetRoleValidatorStorageRepoPicker)
		);
	}

	protected getLogger(id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetRoleLoggerRepoPicker);
		const logData = {
			roleId: id
		};

		return this.container.getLogger(
			LogGetRole,
			loggerRepository,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	protected getInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetRoleInteractorRepoPicker);

		return this.container.getInteractor(
			GetRole,
			interactorRepository,
			id
		);
	}
}
