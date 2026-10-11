import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForDeleteFile} from '@copor/cloud/domain/Cloud/logger/LogDeleteFile';

export class FakeDeleteFileLoggerRepo implements LogRepository<LogDataForDeleteFile> {
	save(logDTO: LogForSave<LogDataForDeleteFile>): Promise<void> {
		return Promise.resolve();
	}
}
