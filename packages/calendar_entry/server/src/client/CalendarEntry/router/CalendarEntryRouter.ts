import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {
	CreateCalendarEntryController
} from '@copor/calendar_entry/client/CalendarEntry/CreateCalendarEntry/CreateCalendarEntryController';
import {
	UpdateCalendarEntryController
} from '@copor/calendar_entry/client/CalendarEntry/UpdateCalendarEntry/UpdateCalendarEntryController';
import {
	DeleteCalendarEntryController
} from '@copor/calendar_entry/client/CalendarEntry/DeleteCalendarEntry/DeleteCalendarEntryController';
import {GetCalendarEntryController} from '@copor/calendar_entry/client/CalendarEntry/GetCalendarEntry/GetCalendarEntryController';
import {
	GetCalendarEntryListController
} from '@copor/calendar_entry/client/CalendarEntry/GetCalendarEntryList/GetCalendarEntryListController';

export class CalendarEntryRouter extends BaseRouter {
	protected initializeRoutes(): void {
		this.post('/', CreateCalendarEntryController);
		this.get('/list/:userId', GetCalendarEntryListController);
		this.get('/:id', GetCalendarEntryController);
		this.delete('/:id', DeleteCalendarEntryController);
		this.patch('/', UpdateCalendarEntryController);
	}
}
