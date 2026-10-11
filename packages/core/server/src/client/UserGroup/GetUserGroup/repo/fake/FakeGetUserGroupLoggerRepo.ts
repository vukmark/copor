import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetUserGroup} from '@copor/core/domain/UserGroup/logger/LogGetUserGroup';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeGetUserGroupLoggerRepo implements LogRepository<LogDataForGetUserGroup> {
	save(logDTO: LogForSave<LogDataForGetUserGroup>): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
