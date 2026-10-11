import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {
	LogDataForSetPermissionListToUser
} from '@copor/core/domain/Components/Permission/logger/LogSetPermissionListToUser';

export class FakeSetPermissionListToUserLoggerRepo implements LogRepository<LogDataForSetPermissionListToUser> {
	save(logDTO: LogForSave<LogDataForSetPermissionListToUser>): Promise<void> {
		return Promise.resolve();
	}
}
