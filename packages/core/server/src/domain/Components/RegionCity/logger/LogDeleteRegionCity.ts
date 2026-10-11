import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export interface LogDataForDeleteRegionCity {
	regionCityId: string;
}

export class LogDeleteRegionCity extends TypedLogger<LogDataForDeleteRegionCity> {
	getType(): string {
		return 'deleteRegionCity';
	}
}