import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetLanguage} from '@copor/core/domain/Components/Language/logger/LogGetLanguage';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeGetLanguageLoggerRepo implements LogRepository<LogDataForGetLanguage> {
	save(logDTO: LogForSave<LogDataForGetLanguage>): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
