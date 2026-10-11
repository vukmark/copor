import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateDeleteQueuedEmailDTO} from '@copor/core/domain/Core/EmailOutbox/validation/dto/ValidateDeleteQueuedEmailDTO';
import {ValidateDeleteQueuedEmailRepo} from '@copor/core/domain/Core/EmailOutbox/repository/ValidateDeleteQueuedEmailRepo';
import {ValidateCanDeleteQueuedEmail} from '@copor/core/domain/Core/EmailOutbox/validation/validator/ValidateCanDeleteQueuedEmail';
import {ValidateQueuedEmail} from '@copor/core/domain/Core/Validations/Validators/ValidateQueuedEmail';

export class ValidateDeleteQueuedEmail extends ValidationWithPermissionAndRepo<
	ValidateDeleteQueuedEmailDTO,
	ValidateDeleteQueuedEmailRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanDeleteQueuedEmail(this.permissionRepo, this.input.actorId),
			new ValidateQueuedEmail(this.storageRepo, this.input.emailId)
		];
	}
}