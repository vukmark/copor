import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogGetRole extends TypedLogger<LogDataForGetRole> {
	getType(): string {
		return 'getRole';
	}
}

export interface LogDataForGetRole {
	roleId: string;
}