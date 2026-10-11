import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogGetTag extends TypedLogger<LogDataForGetTag> {
	public getType(): string {
		return 'getTag';
	}
}

export interface LogDataForGetTag {
	tag: string;
}