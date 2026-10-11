import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUpdateState extends TypedLogger<LogDataForUpdateState> {
	getType(): string {
		return 'updateState';
	}
}

export interface LogDataForUpdateState {
	id: string;
	name: string;
	code: string;
	countryId: string;
}