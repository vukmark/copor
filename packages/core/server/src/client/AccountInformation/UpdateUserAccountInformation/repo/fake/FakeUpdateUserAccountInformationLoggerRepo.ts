import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {
	LogDataForUpdateUserAccountInformation
} from '@copor/core/domain/User/logger/LogUpdateUserAccountInformation';

export class FakeUpdateUserAccountInformationLoggerRepo implements LogRepository<LogDataForUpdateUserAccountInformation> {
	save(logDTO: LogForSave<LogDataForUpdateUserAccountInformation>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
