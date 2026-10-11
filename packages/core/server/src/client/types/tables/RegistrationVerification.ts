import {Generated} from '@copor/core/client/types/tables/Generated';

export class RegistrationVerification {
	id: string;
	authUserId: string;
	codeHash: string;
	expiresAt: Date;
	used: Generated<boolean>;
	failedAttempts: Generated<number>;
	createdAt: Generated<Date>;
}
