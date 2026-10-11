import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetImage} from '@copor/core/domain/Components/Image/logger/LogGetImage';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeGetImageLoggerRepo implements LogRepository<LogDataForGetImage> {
	save(logDTO: LogForSave<LogDataForGetImage>): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
