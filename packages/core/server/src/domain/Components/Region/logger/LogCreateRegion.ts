import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogCreateRegion extends TypedLogger<LogDataForCreateRegion> {
	public getType(): string {
		return 'createRegion';
	}
}

export interface LogDataForCreateRegion {
	id: string;
	country: string;
	state: string;
	postalCode: string;
}
