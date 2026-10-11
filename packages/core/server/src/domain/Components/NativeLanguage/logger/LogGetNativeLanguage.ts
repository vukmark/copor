import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogGetNativeLanguage extends TypedLogger<LogDataForGetNativeLanguage> {
	getType(): string {
		return 'getNativeLanguage';
	}
}

export interface LogDataForGetNativeLanguage {
	languageId: string;
}
