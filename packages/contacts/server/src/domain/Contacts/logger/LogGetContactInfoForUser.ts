import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogGetContactInfoForUser extends TypedLogger<LogDataForGetContactInfoForUser> {
	public getType(): string {
		return 'getContactById';
	}
}

export interface LogDataForGetContactInfoForUser {
	id: string;
}