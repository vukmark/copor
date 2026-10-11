import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateRole} from '@copor/core/domain/Components/Role/logger/LogCreateRole';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeUpdateRoleLoggerRepo implements LogRepository<LogDataForCreateRole> {
	save(logDTO: LogForSave<LogDataForCreateRole>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
