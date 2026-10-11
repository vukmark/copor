import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUpdateRegionCity extends TypedLogger<LogDataForUpdateRegionCity> {
	public getType(): string {
		return 'updateRegionCity';
	}
}
export interface LogDataForUpdateRegionCity {
	id: string;
	regionId: string;
	city: string;
	province: string;
	provinceCode: string;
	community: string;
	communityCode: string;
	latitude: number;
	longitude: number;
}