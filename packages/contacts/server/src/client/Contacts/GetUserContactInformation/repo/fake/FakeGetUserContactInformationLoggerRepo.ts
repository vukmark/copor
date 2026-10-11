import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForGetUserContactInformation}
	from '@copor/contacts/domain/Contacts/GetUserContactInformation/logger/LogGetUserContactInformation';

export class FakeGetUserContactInformationLoggerRepo
implements LogRepository<LogDataForGetUserContactInformation> {
	save(logDTO: LogForSave<LogDataForGetUserContactInformation>): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
