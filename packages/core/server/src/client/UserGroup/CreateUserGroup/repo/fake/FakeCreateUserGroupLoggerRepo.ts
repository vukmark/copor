import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForCreateUserGroup} from '@copor/core/domain/UserGroup/logger/LogCreateUserGroup';

export class FakeCreateUserGroupLoggerRepo implements LogRepository<LogDataForCreateUserGroup> {
	save(logDTO: LogForSave<LogDataForCreateUserGroup>): Promise<void> {
		return Promise.resolve();
	}
}
