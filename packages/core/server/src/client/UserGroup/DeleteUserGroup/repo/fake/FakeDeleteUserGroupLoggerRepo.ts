import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForDeleteUserGroup} from '@copor/core/domain/UserGroup/logger/LogDeleteUserGroup';

export class FakeDeleteUserGroupLoggerRepo implements LogRepository<LogDataForDeleteUserGroup> {
	save(logDTO: LogForSave<LogDataForDeleteUserGroup>): Promise<void> {
		return Promise.resolve();
	}
}
