import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUpdateCountry extends TypedLogger<LogDataForUpdateCountry> {
	getType(): string {
		return 'updateCountry';
	}
}

export interface LogDataForUpdateCountry {
	id: string;
	name: string;
	code: string;
}
