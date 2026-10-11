import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForDeleteNativeLanguage} from '@copor/core/domain/Components/NativeLanguage/logger/LogDeleteNativeLanguage';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeDeleteNativeLanguageLoggerRepo implements LogRepository<LogDataForDeleteNativeLanguage> {
	save(logDTO: LogForSave<LogDataForDeleteNativeLanguage>): Promise<void> {
		return Promise.resolve();
	}
}