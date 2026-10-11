import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	ValidateUpdateCalendarEntryRepo
} from '@copor/calendar_entry/domain/CalendarEntry/repository/ValidateUpdateCalendarEntryRepo';
import {
	FakeUpdateCalendarEntryValidatorStorageRepo
} from '@copor/calendar_entry/client/CalendarEntry/UpdateCalendarEntry/repo/fake/FakeUpdateCalendarEntryValidatorStorageRepo';
import {
	KyselyUpdateCalendarEntryValidatorStorageRepo
} from '@copor/calendar_entry/client/CalendarEntry/UpdateCalendarEntry/repo/kysely/KyselyUpdateCalendarEntryValidatorStorageRepo';

export class UpdateCalendarEntryValidatorStorageRepoPicker
	extends NewRepositoryPicker<ValidateUpdateCalendarEntryRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateUpdateCalendarEntryRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateCalendarEntryValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyUpdateCalendarEntryValidatorStorageRepo
		};
	}
}
