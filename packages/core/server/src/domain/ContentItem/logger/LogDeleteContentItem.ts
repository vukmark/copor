import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogDeleteContentItem extends TypedLogger<LogDataForDeleteContentItem> {
	getType(): string {
		return 'deleteContentType';
	}
}


export interface LogDataForDeleteContentItem {
	contentItemId: string;
}