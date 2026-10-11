import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {GetCalendarEntryRepo} from '@copor/calendar_entry/domain/CalendarEntry/repository/GetCalendarEntryRepo';
import {
	FakeGetCalendarEntryInteractorRepo
} from '@copor/calendar_entry/client/CalendarEntry/GetCalendarEntry/repo/fake/FakeGetCalendarEntryInteractorRepo';
import {
	KyselyGetCalendarEntryInteractorRepo
} from '@copor/calendar_entry/client/CalendarEntry/GetCalendarEntry/repo/kysely/KyselyGetCalendarEntryInteractorRepo';

export class GetCalendarEntryInteractorRepoPicker extends NewRepositoryPicker<GetCalendarEntryRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetCalendarEntryRepo> {
		return {
			[DBEnv.FAKE]: FakeGetCalendarEntryInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetCalendarEntryInteractorRepo
		};
	}
}
