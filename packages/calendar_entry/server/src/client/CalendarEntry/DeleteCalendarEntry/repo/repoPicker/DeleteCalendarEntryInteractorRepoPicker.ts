import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {DeleteCalendarEntryRepo} from '@copor/calendar_entry/domain/CalendarEntry/repository/DeleteCalendarEntryRepo';
import {
	FakeDeleteCalendarEntryInteractorRepo
} from '@copor/calendar_entry/client/CalendarEntry/DeleteCalendarEntry/repo/fake/FakeDeleteCalendarEntryInteractorRepo';
import {
	KyselyDeleteCalendarEntryInteractorRepo
} from '@copor/calendar_entry/client/CalendarEntry/DeleteCalendarEntry/repo/kysely/KyselyDeleteCalendarEntryInteractorRepo';

export class DeleteCalendarEntryInteractorRepoPicker extends NewRepositoryPicker<DeleteCalendarEntryRepo> {
	protected getRepositoryList(): Record<string, new () => DeleteCalendarEntryRepo> {
		return {
			[DBEnv.FAKE]: FakeDeleteCalendarEntryInteractorRepo,
			[DBEnv.KYSELY]: KyselyDeleteCalendarEntryInteractorRepo
		};
	}
}
