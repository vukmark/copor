import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {SaveCalendarEntryRepo} from '@copor/calendar_entry/domain/CalendarEntry/repository/SaveCalendarEntryRepo';
import {
	FakeCreateCalendarEntryInteractorRepo
} from '@copor/calendar_entry/client/CalendarEntry/CreateCalendarEntry/repo/fake/FakeCreateCalendarEntryInteractorRepo';
import {
	KyselyCreateCalendarEntryInteractorRepo
} from '@copor/calendar_entry/client/CalendarEntry/CreateCalendarEntry/repo/kysely/KyselyCreateCalendarEntryInteractorRepo';

export class CreateCalendarEntryInteractorRepoPicker extends NewRepositoryPicker<SaveCalendarEntryRepo> {
	protected getRepositoryList(): Record<string, new () => SaveCalendarEntryRepo> {
		return {
			[DBEnv.FAKE]: FakeCreateCalendarEntryInteractorRepo,
			[DBEnv.KYSELY]: KyselyCreateCalendarEntryInteractorRepo
		};
	}
}
