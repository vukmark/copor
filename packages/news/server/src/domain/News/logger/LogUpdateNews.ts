import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUpdateNews extends TypedLogger<LogDataForUpdateNews> {
	getType(): string {
		return 'updateNews';
	}
}


export interface LogDataForUpdateNews {
	id: string;
	title: string;
	summary: string;
	content: string;
	roleId: string[];
	publishStatus: PublishStatus;
}