import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export interface LogDataForGetAllPermissionsForUser {
	userId: string;
}

export class LogGetAllPermissionsForUser extends TypedLogger<LogDataForGetAllPermissionsForUser> {
	getType(): string {
		return 'getAllPermissionsForUser';
	}
}