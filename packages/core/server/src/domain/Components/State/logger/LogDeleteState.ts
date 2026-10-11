import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogDeleteState extends TypedLogger<LogDataForDeleteState> {
	getType(): string {
		return 'deleteState';
	}
}
export interface LogDataForDeleteState {
	stateId: string;
}
