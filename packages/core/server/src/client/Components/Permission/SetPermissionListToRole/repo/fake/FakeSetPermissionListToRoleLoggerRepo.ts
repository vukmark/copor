import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForSetPermissionListToRole}
	from '@copor/core/domain/Components/Permission/logger/LogSetPermissionListToRole';

export class FakeSetPermissionListToRoleLoggerRepo implements LogRepository<LogDataForSetPermissionListToRole> {
	save(logDTO: LogForSave<LogDataForSetPermissionListToRole>): Promise<void> {
		return Promise.resolve();
	}
}
