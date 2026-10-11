import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {IsValidVerificationCodeRepo} from '@copor/core/domain/Registration/repository/IsValidVerificationCodeRepo';
import {VerifyRegistrationDTO} from '@copor/core/domain/Registration/interactor/dto/VerifyRegistrationDTO';
import {InvalidCodeException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidCodeException';

export class ValidateRegistrationVerificationCode
	extends ValidatorWithRepo<IsValidVerificationCodeRepo, VerifyRegistrationDTO> {
	public async validate(): Promise<void> {
		if (!this.input?.code?.trim() || !await this.repository.isValidVerificationCode(this.input))
			throw new InvalidCodeException();
	}
}
