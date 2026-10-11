import {ValidateGetRole} from '@copor/core/domain/Components/Role/validations/ValidateGetRole';
import {GetRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/GetRoleDTO';
import {GetRole} from '@copor/core/domain/Components/Role/interactor/GetRole';
import {LogGetRole} from '@copor/core/domain/Components/Role/logger/LogGetRole';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateGetRoleInputDTO} from '@copor/core/domain/Components/Role/validations/dto/ValidateGetRoleInputDTO';
import {GetRoleFormPresenter} from '@copor/core/client/Components/Role/GetRoleForm/GetRoleFormPresenter';
import {
	GetRoleValidatorStorageRepoPicker
} from '@copor/core/client/Components/Role/GetRole/repo/repoPicker/GetRoleValidatorStorageRepoPicker';
import {GetRoleLoggerRepoPicker} from '@copor/core/client/Components/Role/GetRole/repo/repoPicker/GetRoleLoggerRepoPicker';
import {GetRoleInteractorRepoPicker} from '@copor/core/client/Components/Role/GetRole/repo/repoPicker/GetRoleInteractorRepoPicker';
import {GetFormViewModel} from '@copor/core/client/Core/Form/GetFormViewModel';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {FormBaseController} from '@copor/core/client/Core/Controller/FormBaseController';
import {Presenter} from '@copor/core/client/Interface/Presenter';


export class GetRoleFormController extends FormBaseController<GetRoleDTO, GetFormViewModel> {
	protected getPresenter(response: GetRoleDTO): Presenter<GetFormViewModel> {
		return this.container.getPresenter(GetRoleFormPresenter, response);
	}

	protected getDefaultFormValues() : GetRoleDTO {
		return {
			id: '',
			name: '',
			type: RoleType.USER
		};
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
