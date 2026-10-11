import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogCreateState extends TypedLogger<LogDataForCreateState> {
	getType(): string {
		return 'createState';
	}
}

export interface LogDataForCreateState {
	id: string;
	name: string;
	code: string;
	countryId: string;
}