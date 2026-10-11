import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForUpdateUserLoginInformation} from '@copor/core/domain/User/logger/LogUpdateUserLoginInformation';

export class FakeUpdateUserLoginInformationLoggerRepo implements LogRepository<LogDataForUpdateUserLoginInformation> {
	save(logDTO: LogForSave<LogDataForUpdateUserLoginInformation>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
