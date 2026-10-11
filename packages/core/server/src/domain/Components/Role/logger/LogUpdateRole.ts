import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

export class LogUpdateRole extends TypedLogger<LogDataForUpdateRole> {
	getType(): string {
		return 'updateRole';
	}
}
export interface LogDataForUpdateRole {
	id: string;
	name: string;
	type: RoleType;
}
