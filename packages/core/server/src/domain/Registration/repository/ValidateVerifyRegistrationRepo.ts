import {RegistrationStatusRepo} from '@copor/core/domain/Registration/repository/RegistrationStatusRepo';
import {IsValidVerificationCodeRepo} from '@copor/core/domain/Registration/repository/IsValidVerificationCodeRepo';

export interface ValidateVerifyRegistrationRepo extends RegistrationStatusRepo, IsValidVerificationCodeRepo {
	// Id of the pending account with this email, used as the audit-log actor.
	getPendingUserId(email: string): Promise<string | undefined>;
}
