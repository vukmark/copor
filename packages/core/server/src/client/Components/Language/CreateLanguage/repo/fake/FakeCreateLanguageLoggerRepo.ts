import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateLanguage} from '@copor/core/domain/Components/Language/logger/LogCreateLanguage';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeCreateLanguageLoggerRepo implements LogRepository<LogDataForCreateLanguage> {
	save(logDTO: LogForSave<LogDataForCreateLanguage>): Promise<void> {
		return Promise.resolve();
	}
}
