import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetNativeLanguage} from '@copor/core/domain/Components/NativeLanguage/logger/LogGetNativeLanguage';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeGetNativeLanguageLoggerRepo implements LogRepository<LogDataForGetNativeLanguage> {
	save(logDTO: LogForSave<LogDataForGetNativeLanguage>): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
