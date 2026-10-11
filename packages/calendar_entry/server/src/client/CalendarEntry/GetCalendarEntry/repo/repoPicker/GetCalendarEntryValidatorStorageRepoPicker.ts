import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {ValidateGetCalendarEntryRepo} from '@copor/calendar_entry/domain/CalendarEntry/repository/ValidateGetCalendarEntryRepo';
import {
	FakeGetCalendarEntryValidatorStorageRepo
} from '@copor/calendar_entry/client/CalendarEntry/GetCalendarEntry/repo/fake/FakeGetCalendarEntryValidatorStorageRepo';
import {
	KyselyGetCalendarEntryValidatorStorageRepo
} from '@copor/calendar_entry/client/CalendarEntry/GetCalendarEntry/repo/kysely/KyselyGetCalendarEntryValidatorStorageRepo';

export class GetCalendarEntryValidatorStorageRepoPicker
	extends NewRepositoryPicker<ValidateGetCalendarEntryRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateGetCalendarEntryRepo> {
		return {
			[DBEnv.FAKE]: FakeGetCalendarEntryValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyGetCalendarEntryValidatorStorageRepo
		};
	}
}
