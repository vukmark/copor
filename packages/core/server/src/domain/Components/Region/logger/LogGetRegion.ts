import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogGetRegion extends TypedLogger<LogDataForGetRegion> {
	public getType(): string {
		return 'getRegion';
	}
}

export interface LogDataForGetRegion {
	region: string;
}