import {Generated} from '@copor/core/client/types/tables/Generated';

export class PasswordResetToken {
	id: string;
	authUserId: string;
	codeHash: string;
	expiresAt: Date;
	used: Generated<boolean>;
	createdAt: Generated<Date>;
}