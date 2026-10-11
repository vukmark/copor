import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUpdateNativeLanguage extends TypedLogger<LogDataForUpdateNativeLanguage> {
	getType(): string {
		return 'updateNativeLanguage';
	}
}

export interface LogDataForUpdateNativeLanguage {
	id: string;
	name: string;
	code: string;
	nativeName: string;
	publishStatus: PublishStatus;
	actorId: string;
}
