import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogCreateNativeLanguage extends TypedLogger<LogDataForCreateNativeLanguage> {
	getType(): string {
		return 'createNativeLanguage';
	}
}

export interface LogDataForCreateNativeLanguage {
	id: string;
	name: string;
	code: string;
	nativeName: string;
	publishStatus: PublishStatus;
}
