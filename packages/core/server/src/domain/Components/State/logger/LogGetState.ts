import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogGetState extends TypedLogger<LogDataForGetState> {
	getType(): string {
		return 'getState';
	}
}

export interface LogDataForGetState {
	stateId: string;
}

