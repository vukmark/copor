import {SaveCalendarEntryRepo} from '@copor/calendar_entry/domain/CalendarEntry/repository/SaveCalendarEntryRepo';
import {SaveCalendarEntryDTO} from '@copor/calendar_entry/domain/CalendarEntry/interactor/dto/SaveCalendarEntryDTO';

export class FakeCreateCalendarEntryInteractorRepo implements SaveCalendarEntryRepo {
	save(saveDTO: SaveCalendarEntryDTO): Promise<void> {
		return Promise.resolve();
	}
}
