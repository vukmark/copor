import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForUpdateUserGroup} from '@copor/core/domain/UserGroup/logger/LogUpdateUserGroup';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeUpdateUserGroupLoggerRepo implements LogRepository<LogDataForUpdateUserGroup> {
	save(logDTO: LogForSave<LogDataForUpdateUserGroup>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
