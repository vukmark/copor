import {IsInvalidCalendarEntryRepo} from '@copor/calendar_entry/domain/CalendarEntry/repository/IsInvalidCalendarEntryRepo';
import {IsCalendarEntryOverlappingRepo} from '@copor/calendar_entry/domain/CalendarEntry/repository/IsCalendarEntryOverlappingRepo';

export interface ValidateUpdateCalendarEntryRepo
	extends IsInvalidCalendarEntryRepo, IsCalendarEntryOverlappingRepo {}
