import {UpdateCalendarEntryRepo} from '@copor/calendar_entry/domain/CalendarEntry/repository/UpdateCalendarEntryRepo';
import {SaveCalendarEntryDTO} from '@copor/calendar_entry/domain/CalendarEntry/interactor/dto/SaveCalendarEntryDTO';

export class FakeUpdateCalendarEntryInteractorRepo implements UpdateCalendarEntryRepo {
	save(saveDTO: SaveCalendarEntryDTO): Promise<void> {
		return Promise.resolve();
	}
}
