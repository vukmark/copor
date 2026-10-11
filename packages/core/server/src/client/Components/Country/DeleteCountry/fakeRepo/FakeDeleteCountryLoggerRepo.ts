import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForDeleteCountry} from '@copor/core/domain/Components/Country/logger/LogDeleteCountry';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeDeleteCountryLoggerRepo implements LogRepository<LogDataForDeleteCountry> {
	save(logDTO: LogForSave<LogDataForDeleteCountry>): Promise<void> {
		return Promise.resolve();
	}
}