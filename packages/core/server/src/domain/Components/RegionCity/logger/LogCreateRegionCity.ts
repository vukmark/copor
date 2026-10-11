import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogCreateRegionCity extends TypedLogger<LogDataForCreateRegionCity> {
	public getType(): string {
		return 'createRegionCity';
	}
}


export interface LogDataForCreateRegionCity {
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