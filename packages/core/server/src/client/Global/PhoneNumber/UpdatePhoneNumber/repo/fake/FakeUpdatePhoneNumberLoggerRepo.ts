import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForCreatePhoneNumber}
	from '@copor/core/domain/Core/global/PhoneNumber/logger/LogCreatePhoneNumber';

export class FakeUpdatePhoneNumberLoggerRepo implements LogRepository<LogDataForCreatePhoneNumber[]> {
	save(logDTO: LogForSave<LogDataForCreatePhoneNumber[]>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
