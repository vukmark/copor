import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogDeleteCountry extends TypedLogger<LogDataForDeleteCountry> {
	getType(): string {
		return 'deleteCountry';
	}
}

export interface LogDataForDeleteCountry {
	countryId: string;
}