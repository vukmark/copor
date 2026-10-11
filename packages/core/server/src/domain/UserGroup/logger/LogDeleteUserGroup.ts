import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogDeleteUserGroup extends TypedLogger<LogDataForDeleteUserGroup> {
	public getType(): string {
		return 'deleteUserGroup';
	}
}

export interface LogDataForDeleteUserGroup {
	id: string;
}