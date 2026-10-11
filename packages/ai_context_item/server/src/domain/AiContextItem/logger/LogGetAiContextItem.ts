import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogGetAiContextItem extends TypedLogger<LogDataForGetAiContextItem> {
	getType(): string {
		return 'getAiContextItem';
	}
}

export interface LogDataForGetAiContextItem {
	aiContextItemId: string;
}