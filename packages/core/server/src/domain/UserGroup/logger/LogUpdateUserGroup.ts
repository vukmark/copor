import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUpdateUserGroup extends TypedLogger<LogDataForUpdateUserGroup> {
	public getType(): string {
		return 'updateUserGroup';
	}
}

export interface LogDataForUpdateUserGroup {
	id: string;
	name?: string;
}