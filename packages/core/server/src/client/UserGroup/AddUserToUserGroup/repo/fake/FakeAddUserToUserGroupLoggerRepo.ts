import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForAddUserToUserGroup} from '@copor/core/domain/UserGroup/logger/LogAddUserToUserGroup';

export class FakeAddUserToUserGroupLoggerRepo implements LogRepository<LogDataForAddUserToUserGroup> {
	save(logDTO: LogForSave<LogDataForAddUserToUserGroup>): Promise<void> {
		return Promise.resolve();
	}
}