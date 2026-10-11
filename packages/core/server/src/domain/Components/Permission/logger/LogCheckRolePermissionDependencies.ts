import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export interface LogDataForCheckRolePermissionDependencies {
	roleId: string;
}

export class LogCheckRolePermissionDependencies extends TypedLogger<LogDataForCheckRolePermissionDependencies> {
	getType(): string {
		return 'checkRolePermissionDependencies';
	}
}
