import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForSetUserGroupUserList} from '@copor/core/domain/UserGroup/logger/LogSetUserGroupUserList';

export class FakeSetUserGroupUserListLoggerRepo implements LogRepository<LogDataForSetUserGroupUserList> {
	save(logDTO: LogForSave<LogDataForSetUserGroupUserList>): Promise<void> {
		return Promise.resolve();
	}
}
