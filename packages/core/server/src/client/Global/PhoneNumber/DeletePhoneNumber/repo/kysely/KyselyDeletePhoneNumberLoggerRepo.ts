import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForDeletePhoneNumber} from '@copor/core/domain/Core/global/PhoneNumber/logger/LogDeletePhoneNumber';

export class KyselyDeletePhoneNumberLoggerRepo implements LogRepository<LogDataForDeletePhoneNumber> {
	save(logDTO: LogForSave<LogDataForDeletePhoneNumber>): Promise<void> {
		return Promise.resolve();
	}
}