import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForCreateUserAccountInformation} from '@copor/core/domain/User/AccountInformation/logger/LogCreateUserAccountInformation';

export class FakeCreateUserAccountInformationLoggerRepo implements LogRepository<LogDataForCreateUserAccountInformation> {
	save(logDTO: LogForSave<LogDataForCreateUserAccountInformation>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
