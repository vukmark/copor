import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveCalendarEntryDTO} from '@copor/calendar_entry/domain/CalendarEntry/interactor/dto/SaveCalendarEntryDTO';

export type UpdateCalendarEntryRepo = SaveItem<SaveCalendarEntryDTO>;
