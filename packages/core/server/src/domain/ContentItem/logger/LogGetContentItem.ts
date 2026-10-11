import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogGetContentItem extends TypedLogger<LogDataForGetContentItem> {
	getType(): string {
		return 'getContentItem';
	}
}

export interface LogDataForGetContentItem {
	contentItemId: string;
}