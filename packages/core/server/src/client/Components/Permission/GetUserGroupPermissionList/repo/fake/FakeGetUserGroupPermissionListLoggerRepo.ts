import {LogForSaveWithNoData} from '@copor/core/domain/Core/Logger/LogForSaveWithNoData';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetUserGroupPermissionList} from '@copor/core/domain/Components/Permission/logger/LogGetUserGroupPermissionList';

export class FakeGetUserGroupPermissionListLoggerRepo implements LogRepository<LogDataForGetUserGroupPermissionList> {
	save(logDto: LogForSaveWithNoData): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
