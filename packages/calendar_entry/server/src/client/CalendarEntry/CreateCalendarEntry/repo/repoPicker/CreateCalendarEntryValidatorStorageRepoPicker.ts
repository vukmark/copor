import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	ValidateCreateCalendarEntryRepo
} from '@copor/calendar_entry/domain/CalendarEntry/repository/ValidateCreateCalendarEntryRepo';
import {
	FakeCreateCalendarEntryValidatorStorageRepo
} from '@copor/calendar_entry/client/CalendarEntry/CreateCalendarEntry/repo/fake/FakeCreateCalendarEntryValidatorStorageRepo';
import {
	KyselyCreateCalendarEntryValidatorStorageRepo
} from '@copor/calendar_entry/client/CalendarEntry/CreateCalendarEntry/repo/kysely/KyselyCreateCalendarEntryValidatorStorageRepo';

export class CreateCalendarEntryValidatorStorageRepoPicker
	extends NewRepositoryPicker<ValidateCreateCalendarEntryRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateCreateCalendarEntryRepo> {
		return {
			[DBEnv.FAKE]: FakeCreateCalendarEntryValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyCreateCalendarEntryValidatorStorageRepo
		};
	}
}
