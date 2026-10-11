import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetRole} from '@copor/core/domain/Components/Role/logger/LogGetRole';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeGetRoleLoggerRepo implements LogRepository<LogDataForGetRole> {
	save(logDTO: LogForSave<LogDataForGetRole>): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
