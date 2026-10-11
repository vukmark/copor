import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCreateQueuedEmailDTO} from './dto/ValidateCreateQueuedEmailDTO';
import {ValidateEmptyEmailParameter} from '@copor/core/domain/Core/EmailOutbox/validation/validator/ValidateEmptyEmailParameter';
import {ValidateCanCreateQueuedEmail} from '@copor/core/domain/Core/EmailOutbox/validation/validator/ValidateCanCreateQueuedEmail';

export class ValidateCreateQueuedEmail extends ValidationWithPermission<ValidateCreateQueuedEmailDTO> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanCreateQueuedEmail(this.permissionRepo, this.input.actorId),
			new ValidateEmptyEmailParameter(this.input.type),
			new ValidateEmptyEmailParameter(this.input.receiver)
		];
	}
}