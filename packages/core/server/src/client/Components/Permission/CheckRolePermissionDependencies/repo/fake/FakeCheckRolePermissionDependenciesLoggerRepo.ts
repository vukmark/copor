import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {
	LogDataForCheckRolePermissionDependencies
} from '@copor/core/domain/Components/Permission/logger/LogCheckRolePermissionDependencies';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeCheckRolePermissionDependenciesLoggerRepo implements LogRepository<LogDataForCheckRolePermissionDependencies> {
	save(logDto: LogForSave<LogDataForCheckRolePermissionDependencies>): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
