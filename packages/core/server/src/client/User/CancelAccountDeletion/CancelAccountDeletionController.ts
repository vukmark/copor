import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {CancelAccountDeletionValidatorStorageRepoPicker}
	from '@copor/core/client/User/CancelAccountDeletion/repo/repoPicker/CancelAccountDeletionValidatorStorageRepoPicker';
import {ValidateCancelAccountDeletion} from '@copor/core/domain/User/validation/ValidateCancelAccountDeletion';
import {CancelAccountDeletionInteractorRepoPicker}
	from '@copor/core/client/User/CancelAccountDeletion/repo/repoPicker/CancelAccountDeletionInteractorRepoPicker';
import {CancelAccountDeletion} from '@copor/core/domain/User/interactor/CancelAccountDeletion';
import {CancelAccountDeletionLoggerRepoPicker}
	from '@copor/core/client/User/CancelAccountDeletion/repo/repoPicker/CancelAccountDeletionLoggerRepoPicker';
import {LogDataForCancelAccountDeletion, LogCancelAccountDeletion} from '@copor/core/domain/User/logger/LogCancelAccountDeletion';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';

export class CancelAccountDeletionController extends UpdateBaseController<void> {
	protected getValidator(): Validator {
		return this.container.getValidator(
			ValidateCancelAccountDeletion,
			this.actorId,
			this.container.getNewRepoPicker(PermissionValidatorRepoPicker),
			this.container.getNewRepoPicker(CancelAccountDeletionValidatorStorageRepoPicker)
		);
	}

	protected getInteractor() {
		return this.container.getInteractor(
			CancelAccountDeletion,
			this.container.getNewRepoPicker(CancelAccountDeletionInteractorRepoPicker),
			this.actorId
		);
	}

	protected getLogger() {
		const logData: LogDataForCancelAccountDeletion = {userId: this.actorId};

		return this.container.getLogger(
			LogCancelAccountDeletion,
			this.container.getNewRepoPicker(CancelAccountDeletionLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			logData
		);
	}
}
