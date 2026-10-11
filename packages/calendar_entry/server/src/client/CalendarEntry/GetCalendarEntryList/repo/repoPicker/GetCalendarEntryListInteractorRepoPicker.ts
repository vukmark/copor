import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {GetCalendarEntryListRepo} from '@copor/calendar_entry/domain/CalendarEntry/repository/GetCalendarEntryListRepo';
import {
	FakeGetCalendarEntryListInteractorRepo
} from '@copor/calendar_entry/client/CalendarEntry/GetCalendarEntryList/repo/fake/FakeGetCalendarEntryListInteractorRepo';
import {
	KyselyGetCalendarEntryListInteractorRepo
} from '@copor/calendar_entry/client/CalendarEntry/GetCalendarEntryList/repo/kysely/KyselyGetCalendarEntryListInteractorRepo';

export class GetCalendarEntryListInteractorRepoPicker
	extends NewRepositoryPicker<GetCalendarEntryListRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetCalendarEntryListRepo> {
		return {
			[DBEnv.FAKE]: FakeGetCalendarEntryListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetCalendarEntryListInteractorRepo
		};
	}
}
