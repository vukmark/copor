import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {UpdateCalendarEntryRepo} from '@copor/calendar_entry/domain/CalendarEntry/repository/UpdateCalendarEntryRepo';
import {
	FakeUpdateCalendarEntryInteractorRepo
} from '@copor/calendar_entry/client/CalendarEntry/UpdateCalendarEntry/repo/fake/FakeUpdateCalendarEntryInteractorRepo';
import {
	KyselyUpdateCalendarEntryInteractorRepo
} from '@copor/calendar_entry/client/CalendarEntry/UpdateCalendarEntry/repo/kysely/KyselyUpdateCalendarEntryInteractorRepo';

export class UpdateCalendarEntryInteractorRepoPicker extends NewRepositoryPicker<UpdateCalendarEntryRepo> {
	protected getRepositoryList(): Record<string, new () => UpdateCalendarEntryRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateCalendarEntryInteractorRepo,
			[DBEnv.KYSELY]: KyselyUpdateCalendarEntryInteractorRepo
		};
	}
}
