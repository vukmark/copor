import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogGetNews extends TypedLogger<LogDataForGetNews> {
	getType(): string {
		return 'getNews';
	}
}


export interface LogDataForGetNews {
	newsId: string;
}