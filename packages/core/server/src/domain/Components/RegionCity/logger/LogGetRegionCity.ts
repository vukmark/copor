import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogGetRegionCity extends TypedLogger<LogDataForGetRegionCity> {
	public getType(): string {
		return 'getRegionCity';
	}
}


export interface LogDataForGetRegionCity {
	regionCity: string;
}