import {LogForSaveWithNoData} from '@copor/core/domain/Core/Logger/LogForSaveWithNoData';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {
	LogDataForGetUserPermissionList
} from '@copor/core/domain/Components/Permission/logger/LogGetUserSpecificPermissionList';

export class FakeGetUserSpecificPermissionListLoggerRepo implements LogRepository<LogDataForGetUserPermissionList> {
	save(logDto: LogForSaveWithNoData): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
