import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogCreateContentItem extends TypedLogger<LogDataForCreateContentItem> {
	getType(): string {
		return 'createContentItem';
	}
}

export interface LogDataForCreateContentItem {
	id: string;
	title: string;
	summary: string;
	content: string;
}