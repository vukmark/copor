import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';
import {Color} from '@copor/core/domain/Core/enum/Color';

export class LogUpdateTag extends TypedLogger<LogDataForUpdateTag> {
	getType(): string {
		return 'editTag';
	}
}

export interface LogDataForUpdateTag {
	id: string;
	name: string;
	color: Color;
	description?: string;
	actorId: string;
}
