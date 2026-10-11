import {BaseController} from '@copor/core/client/Core/BaseController';
import {SetPermissionListToRoleReqBodyDTO} from './dto/SetPermissionListToRoleReqBodyDTO';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {SetPermissionListToRoleValidatorStorageRepoPicker} from './repo/repoPicker/SetPermissionListToRoleValidatorStorageRepoPicker';
import {SetPermissionListToRoleInteractorRepoPicker} from './repo/repoPicker/SetPermissionListToRoleInteractorRepoPicker';
import {SetPermissionListToRoleLoggerRepoPicker} from './repo/repoPicker/SetPermissionListToRoleLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {SetPermissionListToRoleDTO} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';
import {ValidateSetPermissionListToRole} from '@copor/core/domain/Components/Permission/validations/ValidateSetPermissionListToRole';
import {SetPermissionListToRole} from '@copor/core/domain/Components/Permission/interactor/SetPermissionListToRole';
import {LogSetPermissionListToRole} from '@copor/core/domain/Components/Permission/logger/LogSetPermissionListToRole';

export class SetPermissionListToRoleController extends BaseController<SetPermissionListToRoleReqBodyDTO, void> {
	async getResponse() {
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<void>,
			this.getValidator(),
			this.getInteractor(),
			this.getLogger()
		);

		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		this.response.status(200);
		this.response.send(response);
	}

	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = container.getNewRepoPicker(SetPermissionListToRoleValidatorStorageRepoPicker);
		const validatorInput: SetPermissionListToRoleDTO = {
			... this.request.body,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateSetPermissionListToRole,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	private getInteractor() : UseCase<void> {
		const container = this.container;
		const interactorInput: SetPermissionListToRoleDTO = {
			... this.request.body,
			actorId: this.actorId
		};
		const interactorRepo = container.getNewRepoPicker(SetPermissionListToRoleInteractorRepoPicker);

		return container.getInteractor(
			SetPermissionListToRole,
			interactorRepo,
			interactorInput
		);
	}

	private getLogger() : LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(SetPermissionListToRoleLoggerRepoPicker);
		const logData = this.request.body;

		return container.getLogger(
			LogSetPermissionListToRole,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}
}
