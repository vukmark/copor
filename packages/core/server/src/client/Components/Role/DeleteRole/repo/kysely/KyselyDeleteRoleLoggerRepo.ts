import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForDeleteRole} from '@copor/core/domain/Components/Role/logger/LogDeleteRole';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class KyselyDeleteRoleLoggerRepo implements LogRepository<LogDataForDeleteRole> {
	save(logDTO: LogForSave<LogDataForDeleteRole>): Promise<void> {
		return Promise.resolve();
	}
}