import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogDeleteLanguage extends TypedLogger<LogDataForDeleteLanguage> {
	getType(): string {
		return 'deleteLanguage';
	}
}
export interface LogDataForDeleteLanguage {
	languageId: string;
}
