import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForDeleteImage} from '@copor/core/domain/Components/Image/logger/LogDeleteImage';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeDeleteImageLoggerRepo implements LogRepository<LogDataForDeleteImage> {
	save(logDTO: LogForSave<LogDataForDeleteImage>): Promise<void> {
		return Promise.resolve();
	}
}