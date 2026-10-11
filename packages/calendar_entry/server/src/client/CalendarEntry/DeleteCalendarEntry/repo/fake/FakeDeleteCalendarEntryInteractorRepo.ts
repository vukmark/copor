import {DeleteCalendarEntryRepo} from '@copor/calendar_entry/domain/CalendarEntry/repository/DeleteCalendarEntryRepo';

export class FakeDeleteCalendarEntryInteractorRepo implements DeleteCalendarEntryRepo {
	delete(itemId: string): Promise<void> {
		return Promise.resolve();
	}
}
