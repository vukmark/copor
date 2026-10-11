import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateCountry} from '@copor/core/domain/Components/Country/logger/LogCreateCountry';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeCreateCountryLoggerRepo implements LogRepository<LogDataForCreateCountry> {
	save(logDTO: LogForSave<LogDataForCreateCountry>): Promise<void> {
		return Promise.resolve();
	}
}
