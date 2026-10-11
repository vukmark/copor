import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogCreateRole extends TypedLogger<LogDataForCreateRole> {
	getType(): string {
		return 'createRole';
	}
}
export interface LogDataForCreateRole {
	id: string;
	name: string;
	type: RoleType
}

