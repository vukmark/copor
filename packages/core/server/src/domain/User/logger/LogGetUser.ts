import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogGetUser extends TypedLogger<LogDataForGetUser> {
	public getType(): string {
		return 'getUser';
	}
}

export interface LogDataForGetUser {
	id: string;
}