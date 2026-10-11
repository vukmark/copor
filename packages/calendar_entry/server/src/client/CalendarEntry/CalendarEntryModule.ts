import path from 'path';
import {CoporModule} from '@copor/core/client/Core/Module/CoporModule';
import {calendarEntryPermissionDefinitions} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryPermissionDefinitions';
import {CalendarEntryRouter} from '@copor/calendar_entry/client/CalendarEntry/router/CalendarEntryRouter';

export const calendarEntryModule: CoporModule = {
	name: 'calendar_entry',
	localesFolder: path.join(__dirname, 'locales'),
	// The calendar's \"new ToDo\" action opens the ToDo form (frontend).
	dependsOn: ['todo'],
	migrationsFolder: path.join(__dirname, 'migrations'),
	permissions: calendarEntryPermissionDefinitions,
	routes: [
		{path: '/calendar-entry', router: CalendarEntryRouter}
	]
};
