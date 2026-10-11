import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {
	LogDataForGetRolePermissionList
} from '@copor/core/domain/Components/Permission/logger/LogGetRolePermissionList';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeGetRolePermissionListLoggerRepo implements LogRepository<LogDataForGetRolePermissionList> {
	save(logDto: LogForSave<LogDataForGetRolePermissionList>): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
