import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {InvalidQueuedEmailException} from '@copor/core/domain/Core/EmailOutbox/exception/InvalidQueuedEmailException';
import {IsInvalidQueuedEmailRepo} from '@copor/core/domain/Core/EmailOutbox/repository/IsInvalidQueuedEmailRepo';

export class ValidateQueuedEmail extends ValidatorWithRepo<IsInvalidQueuedEmailRepo, string | undefined> {
	public async validate(): Promise<void> {
		if (await this.repository.isInvalidQueuedEmail(this.input))
			throw new InvalidQueuedEmailException();
	}
}