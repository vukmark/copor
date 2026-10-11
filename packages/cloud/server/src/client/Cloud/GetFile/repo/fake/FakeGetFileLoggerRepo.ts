import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForGetFile} from '@copor/cloud/domain/Cloud/logger/LogGetFile';

export class FakeGetFileLoggerRepo implements LogRepository<LogDataForGetFile> {
	save(logDTO: LogForSave<LogDataForGetFile>): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
