import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForDeleteLanguage} from '@copor/core/domain/Components/Language/logger/LogDeleteLanguage';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeDeleteLanguageLoggerRepo implements LogRepository<LogDataForDeleteLanguage> {
	save(logDTO: LogForSave<LogDataForDeleteLanguage>): Promise<void> {
		return Promise.resolve();
	}
}