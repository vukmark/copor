import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForUpdateAuthUserInformation} from '@copor/core/domain/User/logger/LogUpdateAuthUserInformation';

export class FakeUpdateAuthUserInformationLoggerRepo
implements LogRepository<LogDataForUpdateAuthUserInformation> {
	save(logDTO: LogForSave<LogDataForUpdateAuthUserInformation>): Promise<void> {
		return Promise.resolve();
	}
}
