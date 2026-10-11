import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export class LogCreateNews extends TypedLogger<LogDataForCreateNews> {
	getType(): string {
		return 'createNews';
	}
}


export interface LogDataForCreateNews {
	id: string;
	title: string;
	summary: string;
	content: string;
	roleId: string[];
	publishStatus: PublishStatus;
}