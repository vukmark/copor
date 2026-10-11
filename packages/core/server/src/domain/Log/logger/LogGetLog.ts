import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogGetLog extends TypedLogger<LogDataForGetLog> {
	public getType(): string {
		return 'getLog';
	}
}

export interface LogDataForGetLog {
	log: string;
}