import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogCreateUserGroup extends TypedLogger<LogDataForCreateUserGroup> {
	public getType(): string {
		return 'createUserGroup';
	}
}

export interface LogDataForCreateUserGroup {
	id: string;
	name: string;
	parentUserGroupId?: string;
}