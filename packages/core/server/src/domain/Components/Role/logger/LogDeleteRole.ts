import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogDeleteRole extends TypedLogger<LogDataForDeleteRole> {
	getType(): string {
		return 'deleteRole';
	}
}
export interface LogDataForDeleteRole {
	roleId: string;
}
