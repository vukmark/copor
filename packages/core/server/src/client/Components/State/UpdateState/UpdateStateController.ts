import {UpdateStateReqBodyDTO} from './dto/UpdateStateReqBodyDTO';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateUpdateState} from '@copor/core/domain/Components/State/validations/ValidateUpdateState';
import {UpdateState} from '@copor/core/domain/Components/State/interactor/UpdateState';
import {UpdateStateInteractorRepoPicker} from '@copor/core/client/Components/State/UpdateState/repo/repoPicker/UpdateStateInteractorRepoPicker';
import {UpdateStateLoggerRepoPicker} from '@copor/core/client/Components/State/UpdateState/repo/repoPicker/UpdateStateLoggerRepoPicker';
import {LogDataForUpdateState, LogUpdateState} from '@copor/core/domain/Components/State/logger/LogUpdateState';
import {SaveStateDTO} from '@copor/core/domain/Components/State/interactor/dto/SaveStateDTO';
import {UpdateStateValidatorStorageRepoPicker}
	from '@copor/core/client/Components/State/UpdateState/repo/repoPicker/UpdateStateValidatorStorageRepoPicker';
import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';

export class UpdateStateController extends UpdateBaseController<UpdateStateReqBodyDTO> {
	protected getValidator(): Validator {
		const validatorPermissionRepo = this.container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = this.container.getNewRepoPicker(
			UpdateStateValidatorStorageRepoPicker
		);
		const input: SaveStateDTO = {
			... this.request.body,
			actorId: this.actorId
		};

		return this.container.getValidator(
			ValidateUpdateState,
			input,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor() {
		const input: SaveStateDTO = {
			... this.request.body,
			actorId: this.actorId
		};

		return this.container.getInteractor(
			UpdateState,
			this.container.getNewRepoPicker(UpdateStateInteractorRepoPicker),
			input);
	}

	protected getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(UpdateStateLoggerRepoPicker);
		const logData: LogDataForUpdateState = this.request.body;

		return this.container.getLogger(
			LogUpdateState,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}
}
