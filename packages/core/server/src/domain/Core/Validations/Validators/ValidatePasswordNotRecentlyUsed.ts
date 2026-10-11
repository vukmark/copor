import {ValidatorWithRepo} from './ValidatorWithRepo';
import {PasswordHistoryRepo} from '@copor/core/domain/Core/Repository/PasswordHistoryRepo';
import {PasswordHistoryContextDTO} from '@copor/core/domain/Core/Validations/Validators/dto/PasswordHistoryContextDTO';
import {PasswordRecentlyUsedException} from '@copor/core/domain/Core/Exceptions/invalid/PasswordRecentlyUsedException';

export class ValidatePasswordNotRecentlyUsed extends ValidatorWithRepo<PasswordHistoryRepo, PasswordHistoryContextDTO> {
	public async validate(): Promise<void> {
		if (!this.input)
			return;

		if (await this.repository.wasPasswordRecentlyUsed(this.input.authUserId, this.input.password)) {
			throw new PasswordRecentlyUsedException();
		}
	}
}
