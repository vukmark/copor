import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForCreateFile} from '@copor/cloud/domain/Cloud/logger/LogCreateFile';

export class FakeCreateFileLoggerRepo implements LogRepository<LogDataForCreateFile> {
	save(logDTO: LogForSave<LogDataForCreateFile>): Promise<void> {
		return Promise.resolve();
	}
}
