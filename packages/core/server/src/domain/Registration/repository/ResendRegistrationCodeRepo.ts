import {ResendRegistrationCodeDTO} from '@copor/core/domain/Registration/interactor/dto/ResendRegistrationCodeDTO';

export interface ResendRegistrationCodeRepo {
	// Replaces the code of a pending account with this email and emails it.
	// Does nothing when there is no such account, so callers can't probe emails.
	resend(input: ResendRegistrationCodeDTO): Promise<void>;
}
