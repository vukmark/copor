import {ToggleUserActiveStatusReqBodyDTO} from '@copor/core/client/User/ToggleUserActiveStatus/dto/ToggleUserActiveStatusReqBodyDTO';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ToggleUserActiveStatusValidatorStorageRepoPicker}
	from '@copor/core/client/User/ToggleUserActiveStatus/repo/repoPicker/ToggleUserActiveStatusValidatorStorageRepoPicker';
import {ValidateToggleUserActiveStatus} from '@copor/core/domain/User/validation/ValidateToggleUserActiveStatus';
import {ValidateToggleUserActiveStatusDTO} from '@copor/core/domain/User/validation/dto/ValidateToggleUserActiveStatusDTO';
import {ToggleUserActiveStatusInteractorRepoPicker}
	from '@copor/core/client/User/ToggleUserActiveStatus/repo/repoPicker/ToggleUserActiveStatusInteractorRepoPicker';
import {ToggleUserActiveStatus} from '@copor/core/domain/User/interactor/ToggleUserActiveStatus';
import {ToggleUserActiveStatusDTO} from '@copor/core/domain/User/interactor/dto/ToggleUserActiveStatusDTO';
import {ToggleUserActiveStatusLoggerRepoPicker}
	from '@copor/core/client/User/ToggleUserActiveStatus/repo/repoPicker/ToggleUserActiveStatusLoggerRepoPicker';
import {LogDataForToggleUserActiveStatus, LogToggleUserActiveStatus} from '@copor/core/domain/User/logger/LogToggleUserActiveStatus';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';

interface ToggleUserActiveStatusParams {
	id: string;
}

export class ToggleUserActiveStatusController extends UpdateBaseController<ToggleUserActiveStatusReqBodyDTO> {
	private getId(): string {
		return (this.request.params as ToggleUserActiveStatusParams).id;
	}

	protected getValidator(): Validator {
		const validatorInput: ValidateToggleUserActiveStatusDTO = {
			id: this.getId(),
			actorId: this.actorId
		};

		return this.container.getValidator(
			ValidateToggleUserActiveStatus,
			validatorInput,
			this.container.getNewRepoPicker(PermissionValidatorRepoPicker),
			this.container.getNewRepoPicker(ToggleUserActiveStatusValidatorStorageRepoPicker)
		);
	}

	protected getInteractor() {
		const interactorInput: ToggleUserActiveStatusDTO = {
			id: this.getId(),
			isActive: this.request.body.isActive,
			actorId: this.actorId
		};

		return this.container.getInteractor(
			ToggleUserActiveStatus,
			this.container.getNewRepoPicker(ToggleUserActiveStatusInteractorRepoPicker),
			interactorInput
		);
	}

	protected getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(ToggleUserActiveStatusLoggerRepoPicker);
		const logData: LogDataForToggleUserActiveStatus = {
			id: this.getId(),
			isActive: this.request.body.isActive
		};

		return this.container.getLogger(
			LogToggleUserActiveStatus,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}
}
