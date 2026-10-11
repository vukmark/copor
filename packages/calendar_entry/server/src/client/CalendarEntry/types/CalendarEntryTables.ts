import {CalendarEntryTable} from '@copor/calendar_entry/client/CalendarEntry/types/CalendarEntryTable';

// The CalendarEntry module's tables, added to core's DB interface.
declare module '@copor/core/client/types/db' {
	interface DB {
		calendarEntry: CalendarEntryTable;
	}
}
