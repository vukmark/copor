import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export interface LogDataForUpdateAddress {
	id: string;
	country: string;
	state: string;
	streetAddress: string;
	city: string;
	postalCode: string;
	citizenship: string;
}

export class LogUpdateAddress extends TypedLogger<LogDataForUpdateAddress> {
	getType(): string {
		return 'updateAddress';
	}
}