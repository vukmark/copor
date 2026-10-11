import {GetCalendarEntryDTO} from '@copor/calendar_entry/domain/CalendarEntry/interactor/dto/GetCalendarEntryDTO';

export interface GetCalendarEntryListRepo {
	list(userId: string): Promise<GetCalendarEntryDTO[]>;
}
