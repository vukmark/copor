import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUpdateContentItem extends TypedLogger<LogDataForUpdateContentItem> {
	getType(): string {
		return 'updateContentItem';
	}
}


export interface LogDataForUpdateContentItem {
	id: string;
	title: string;
	summary: string;
	content: string;
}