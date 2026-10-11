import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export interface LogDataForCreateAddress {
	id: string;
	country: string;
	state: string;
	streetAddress: string;
	city: string;
	postalCode: string;
	citizenship: string;
}

export class LogCreateAddress extends TypedLogger<LogDataForCreateAddress> {
	getType(): string {
		return 'createAddress';
	}
}