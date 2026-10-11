import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogRegister extends TypedLogger<LogDataForRegister> {
	public getType(): string {
		return 'register';
	}
}

export interface LogDataForRegister {
	email: string;
	userName: string;
}
