import {BaseController} from '@copor/core/client/Core/BaseController';
import {SetPermissionListToUserGroupReqBodyDTO} from './dto/SetPermissionListToUserGroupReqBodyDTO';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {SetPermissionListToUserGroupValidatorStorageRepoPicker}
	from './repo/repoPicker/SetPermissionListToUserGroupValidatorStorageRepoPicker';
import {SetPermissionListToUserGroupInteractorRepoPicker} from './repo/repoPicker/SetPermissionListToUserGroupInteractorRepoPicker';
import {SetPermissionListToUserGroupLoggerRepoPicker} from './repo/repoPicker/SetPermissionListToUserGroupLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {
	ValidateSetPermissionListToUserGroup
} from '@copor/core/domain/Components/Permission/validations/ValidateSetPermissionListToUserGroup';
import {
	SetPermissionListToUserGroupDTO
} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToUserGroupDTO';
import {SetPermissionListToUserGroup} from '@copor/core/domain/Components/Permission/interactor/SetPermissionListToUserGroup';
import {LogSetPermissionListToUserGroup} from '@copor/core/domain/Components/Permission/logger/LogSetPermissionListToUserGroup';

export class SetPermissionListToUserGroupController extends BaseController<SetPermissionListToUserGroupReqBodyDTO, void> {
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
		const validatorStorageRepo = container.getNewRepoPicker(SetPermissionListToUserGroupValidatorStorageRepoPicker);
		const validatorInput: SetPermissionListToUserGroupDTO = {
			... this.request.body,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateSetPermissionListToUserGroup,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	private getInteractor() : UseCase<void> {
		const container = this.container;
		const interactorInput: SetPermissionListToUserGroupDTO = {
			... this.request.body,
			actorId: this.actorId
		};
		const interactorRepo = container.getNewRepoPicker(SetPermissionListToUserGroupInteractorRepoPicker);

		return container.getInteractor(
			SetPermissionListToUserGroup,
			interactorRepo,
			interactorInput
		);
	}

	private getLogger() : LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(SetPermissionListToUserGroupLoggerRepoPicker);
		const logData = this.request.body;

		return container.getLogger(
			LogSetPermissionListToUserGroup,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}
}
