import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogDeleteNativeLanguage extends TypedLogger<LogDataForDeleteNativeLanguage> {
	getType(): string {
		return 'deleteNativeLanguage';
	}
}
export interface LogDataForDeleteNativeLanguage {
	languageId: string;
}
