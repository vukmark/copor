import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForToggleUserActiveStatus} from '@copor/core/domain/User/logger/LogToggleUserActiveStatus';

export class FakeToggleUserActiveStatusLoggerRepo implements LogRepository<LogDataForToggleUserActiveStatus> {
	save(logDTO: LogForSave<LogDataForToggleUserActiveStatus>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
