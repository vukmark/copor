import {VerifyRegistrationDTO} from '@copor/core/domain/Registration/interactor/dto/VerifyRegistrationDTO';

export interface IsValidVerificationCodeRepo {
	// True when `code` matches the latest unused, unexpired code of a pending
	// (not yet verified) account with this email. Implementations count failed
	// attempts and invalidate the code after too many.
	isValidVerificationCode(input: VerifyRegistrationDTO): Promise<boolean>;
}
