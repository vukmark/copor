import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {
	LogDataForSetPermissionListToUserGroup
} from '@copor/core/domain/Components/Permission/logger/LogSetPermissionListToUserGroup';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';


export class FakeSetPermissionListToUserGroupLoggerRepo implements LogRepository<LogDataForSetPermissionListToUserGroup> {
	save(logDTO: LogForSave<LogDataForSetPermissionListToUserGroup>): Promise<void> {
		return Promise.resolve();
	}
}
