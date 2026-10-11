import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogDeleteNews extends TypedLogger<LogDataForDeleteNews> {
	getType(): string {
		return 'deleteNews';
	}
}

export interface LogDataForDeleteNews {
	newsId: string;
}