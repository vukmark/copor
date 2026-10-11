import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogCreateCountry extends TypedLogger<LogDataForCreateCountry> {
	getType(): string {
		return 'createCountry';
	}
}

export interface LogDataForCreateCountry {
	id: string;
	name: string;
	code: string;
}
