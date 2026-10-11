import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUpdateRegion extends TypedLogger<LogDataForUpdateRegion> {
	public getType(): string {
		return 'updateRegion';
	}
}

export interface LogDataForUpdateRegion {
	id: string;
	country: string;
	state: string;
	postalCode: string;
	city: string;
	community: string;
	communityCode: string;
	latitude: number;
	longitude: number;
}