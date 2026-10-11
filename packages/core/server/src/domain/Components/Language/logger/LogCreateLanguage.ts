import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogCreateLanguage extends TypedLogger<LogDataForCreateLanguage> {
	getType(): string {
		return 'createLanguage';
	}
}

export interface LogDataForCreateLanguage {
	id: string;
	name: string;
	code: string;
	nativeName: string;
	publishStatus: PublishStatus;
}
