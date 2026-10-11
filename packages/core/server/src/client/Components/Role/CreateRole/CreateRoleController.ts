import {CreateRoleReqBodyDTO} from './dto/CreateRoleReqBodyDTO';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateCreateRole} from '@copor/core/domain/Components/Role/validations/ValidateCreateRole';
import {SaveRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/SaveRoleDTO';
import {CreateRoleInteractorRepoPicker} from './repo/repoPicker/CreateRoleInteractorRepoPicker';
import {CreateRole} from '@copor/core/domain/Components/Role/interactor/CreateRole';
import {CreateRoleLoggerRepoPicker} from './repo/repoPicker/CreateRoleLoggerRepoPicker';
import {LogCreateRole, LogDataForCreateRole} from '@copor/core/domain/Components/Role/logger/LogCreateRole';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {ValidateCreateRoleDTO} from '@copor/core/domain/Components/Role/validations/dto/ValidateCreateRoleDTO';
import {CreateBaseController} from '@copor/core/client/Core/Controller/CreateBaseController';

export class CreateRoleController extends CreateBaseController<CreateRoleReqBodyDTO> {
	protected getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput: ValidateCreateRoleDTO = {
			... this.request.body,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateCreateRole,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}

	protected getInteractor(uniqueId: string) : UseCase<string> {
		const container = this.container;
		const interactorInput: SaveRoleDTO = {
			... this.request.body,
			actorId: this.actorId,
			id: uniqueId
		};
		const interactorRepo = container.getNewRepoPicker(CreateRoleInteractorRepoPicker);

		return container.getInteractor(
			CreateRole,
			interactorRepo,
			interactorInput
		);
	}

	protected getLogger(uniqueId: string) : LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(CreateRoleLoggerRepoPicker);
		const logData = this.getLogData(uniqueId);

		return container.getLogger(
			LogCreateRole,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getLogData(uniqueId: string): LogDataForCreateRole {
		return {
			... this.request.body,
			id: uniqueId
		};
	}
}
