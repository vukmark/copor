import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogSetHoursForToDoAlert extends TypedLogger<LogDataForSetHoursForToDoAlert> {
	getType(): string {
		return 'setHoursForToDoAlert';
	}
}
export interface LogDataForSetHoursForToDoAlert {
	userId: string;
	hours: number;
}
