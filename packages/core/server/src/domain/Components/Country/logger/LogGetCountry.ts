import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogGetCountry extends TypedLogger<LogDataForGetCountry> {
	getType(): string {
		return 'getCountry';
	}
}

export interface LogDataForGetCountry {
	countryId: string;
}