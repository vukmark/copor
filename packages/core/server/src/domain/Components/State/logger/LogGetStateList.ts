import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogGetStateList extends TypedLogger<LogDataForGetStateList> {
	getType(): string {
		return 'getStateList';
	}
}

export interface LogDataForGetStateList {
	countryId: string;
}