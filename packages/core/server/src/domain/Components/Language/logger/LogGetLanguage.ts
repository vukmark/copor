import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogGetLanguage extends TypedLogger<LogDataForGetLanguage> {
	getType(): string {
		return 'getLanguage';
	}
}

export interface LogDataForGetLanguage {
	languageId: string;
}
