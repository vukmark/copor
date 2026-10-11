import {Generated} from '@copor/core/client/types/tables/Generated';

export class PasswordHistory {
	id: string;
	authUserId: string;
	passwordHash: string;
	createdAt: Generated<Date>;
}
