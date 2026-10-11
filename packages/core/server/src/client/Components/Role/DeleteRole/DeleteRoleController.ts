import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {DeleteRoleValidatorStorageRepoPicker} from './repo/repoPicker/DeleteRoleValidatorStorageRepoPicker';
import {ValidateDeleteRole} from '@copor/core/domain/Components/Role/validations/ValidateDeleteRole';
import {DeleteRoleInteractorRepoPicker} from './repo/repoPicker/DeleteRoleInteractorRepoPicker';
import {DeleteRole} from '@copor/core/domain/Components/Role/interactor/DeleteRole';
import {LogDeleteRole} from '@copor/core/domain/Components/Role/logger/LogDeleteRole';
import {DeleteRoleLoggerRepoPicker} from './repo/repoPicker/DeleteRoleLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {ValidateDeleteRoleInputDTO} from '@copor/core/domain/Components/Role/validations/dto/ValidateDeleteRoleInputDTO';
import {DeleteBaseController} from '@copor/core/client/Core/Controller/DeleteBaseController';

export interface DeleteRoleParams {
	id: string;
}

export class DeleteRoleController extends DeleteBaseController<DeleteRoleParams> {

	protected getValidator(id: string) : Validator {
		const c = this.container;
		const input: ValidateDeleteRoleInputDTO = {
			actorId: this.actorId,
			roleId: id
		};

		return c.getValidator(
			ValidateDeleteRole,
			input,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(DeleteRoleValidatorStorageRepoPicker)
		);
	}

	protected getInteractor(id: string) : UseCase<void> {
		const c = this.container;
		const repo = c.getNewRepoPicker(DeleteRoleInteractorRepoPicker);

		return c.getInteractor(DeleteRole, repo, id);
	}

	protected getLogger(id: string) : LogAction {
		return this.container.getLogger(
			LogDeleteRole,
			this.container.getNewRepoPicker(DeleteRoleLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{roleId: id}
		);
	}
}