import {GetCalendarEntryListRepo} from '@copor/calendar_entry/domain/CalendarEntry/repository/GetCalendarEntryListRepo';
import {GetCalendarEntryDTO} from '@copor/calendar_entry/domain/CalendarEntry/interactor/dto/GetCalendarEntryDTO';

export class FakeGetCalendarEntryListInteractorRepo implements GetCalendarEntryListRepo {
	list(userId: string): Promise<GetCalendarEntryDTO[]> {
		return Promise.resolve([]);
	}
}
