import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetCalendarEntryDTO} from '@copor/calendar_entry/domain/CalendarEntry/interactor/dto/GetCalendarEntryDTO';

export type GetCalendarEntryRepo = GetItem<GetCalendarEntryDTO>;
