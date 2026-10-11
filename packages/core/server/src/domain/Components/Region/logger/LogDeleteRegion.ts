import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export interface LogDataForDeleteRegion {
	regionId: string;
}

export class LogDeleteRegion extends TypedLogger<LogDataForDeleteRegion> {
	getType(): string {
		return 'deleteRegion';
	}
}
