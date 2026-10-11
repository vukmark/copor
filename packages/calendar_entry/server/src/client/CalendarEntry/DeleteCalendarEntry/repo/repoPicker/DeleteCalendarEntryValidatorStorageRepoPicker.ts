import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	ValidateDeleteCalendarEntryRepo
} from '@copor/calendar_entry/domain/CalendarEntry/repository/ValidateDeleteCalendarEntryRepo';
import {
	FakeDeleteCalendarEntryValidatorStorageRepo
} from '@copor/calendar_entry/client/CalendarEntry/DeleteCalendarEntry/repo/fake/FakeDeleteCalendarEntryValidatorStorageRepo';
import {
	KyselyDeleteCalendarEntryValidatorStorageRepo
} from '@copor/calendar_entry/client/CalendarEntry/DeleteCalendarEntry/repo/kysely/KyselyDeleteCalendarEntryValidatorStorageRepo';

export class DeleteCalendarEntryValidatorStorageRepoPicker
	extends NewRepositoryPicker<ValidateDeleteCalendarEntryRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateDeleteCalendarEntryRepo> {
		return {
			[DBEnv.FAKE]: FakeDeleteCalendarEntryValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyDeleteCalendarEntryValidatorStorageRepo
		};
	}
}
