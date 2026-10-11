import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForGetUser} from '@copor/core/domain/User/logger/LogGetUser';

export class FakeGetUserLoggerRepo implements LogRepository<LogDataForGetUser> {
	save(logDTO: LogForSave<LogDataForGetUser>): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}