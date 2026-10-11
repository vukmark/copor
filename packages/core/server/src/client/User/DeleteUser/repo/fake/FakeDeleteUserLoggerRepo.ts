import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForDeleteUser} from '@copor/core/domain/User/logger/LogDeleteUser';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeDeleteUserLoggerRepo implements LogRepository<LogDataForDeleteUser> {
	save(logDto: LogForSave<LogDataForDeleteUser>): Promise<void> {
		return Promise.resolve();
	}
}
