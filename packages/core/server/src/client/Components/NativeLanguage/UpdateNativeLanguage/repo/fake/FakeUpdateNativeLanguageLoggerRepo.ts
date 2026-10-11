import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateNativeLanguage} from '@copor/core/domain/Components/NativeLanguage/logger/LogCreateNativeLanguage';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeUpdateNativeLanguageLoggerRepo implements LogRepository<LogDataForCreateNativeLanguage> {
	save(logDTO: LogForSave<LogDataForCreateNativeLanguage>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
