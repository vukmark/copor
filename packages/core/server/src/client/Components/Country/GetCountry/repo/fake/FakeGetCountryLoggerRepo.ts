import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetCountry} from '@copor/core/domain/Components/Country/logger/LogGetCountry';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeGetCountryLoggerRepo implements LogRepository<LogDataForGetCountry> {
	save(logDTO: LogForSave<LogDataForGetCountry>): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
