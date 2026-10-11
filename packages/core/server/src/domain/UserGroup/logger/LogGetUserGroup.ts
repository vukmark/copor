import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogGetUserGroup extends TypedLogger<LogDataForGetUserGroup> {
	public getType(): string {
		return 'getUserGroup';
	}
}

export interface LogDataForGetUserGroup {
	id: string;
}