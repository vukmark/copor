import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForUpdateUserPreferences}
	from '@copor/core/domain/User/UserPreferences/logger/LogUpdateUserPreferences';

export class FakeUpdateUserPreferencesLoggerRepo implements LogRepository<LogDataForUpdateUserPreferences> {
	save(logDTO: LogForSave<LogDataForUpdateUserPreferences>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
