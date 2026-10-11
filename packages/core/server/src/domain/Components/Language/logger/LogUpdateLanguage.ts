import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUpdateLanguage extends TypedLogger<LogDataForUpdateLanguage> {
	getType(): string {
		return 'updateLanguage';
	}
}

export interface LogDataForUpdateLanguage {
	id: string;
	name: string;
	code: string;
	nativeName: string;
	publishStatus: PublishStatus;
	actorId: string;
}
