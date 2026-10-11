import {UpdateRoleReqBodyDTO} from './dto/UpdateRoleReqBodyDTO';
import {UpdateRoleValidatorStorageRepoPicker} from './repo/repoPicker/UpdateRoleValidatorStorageRepoPicker';
import {SaveRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/SaveRoleDTO';
import {ValidateUpdateRole} from '@copor/core/domain/Components/Role/validations/ValidateUpdateRole';
import {UpdateRoleInteractorRepoPicker} from './repo/repoPicker/UpdateRoleInteractorRepoPicker';
import {UpdateRole} from '@copor/core/domain/Components/Role/interactor/UpdateRole';
import {UpdateRoleLoggerRepoPicker} from './repo/repoPicker/UpdateRoleLoggerRepoPicker';
import {LogDataForUpdateRole, LogUpdateRole} from '@copor/core/domain/Components/Role/logger/LogUpdateRole';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';

export class UpdateRoleController extends UpdateBaseController<UpdateRoleReqBodyDTO> {
	protected getValidator(): Validator {
		const validatorPermissionRepo = this.container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = this.container.getNewRepoPicker(
			UpdateRoleValidatorStorageRepoPicker
		);

		return this.container.getValidator(
			ValidateUpdateRole,
			this.getValidatorInput(),
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor() {
		return this.container.getInteractor(
			UpdateRole,
			this.container.getNewRepoPicker(UpdateRoleInteractorRepoPicker),
			this.getValidatorInput()
		);
	}

	protected getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(UpdateRoleLoggerRepoPicker);
		const logData: LogDataForUpdateRole = this.request.body;

		return this.container.getLogger(
			LogUpdateRole,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getValidatorInput(): SaveRoleDTO {
		return {
			... this.request.body,
			actorId: this.actorId
		};
	}
}
