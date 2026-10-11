import {db} from '@copor/core/client/AppDataSource';
import {DeleteCalendarEntryRepo} from '@copor/calendar_entry/domain/CalendarEntry/repository/DeleteCalendarEntryRepo';

export class KyselyDeleteCalendarEntryInteractorRepo implements DeleteCalendarEntryRepo {
	async delete(itemId: string): Promise<void> {
		await db
			.deleteFrom('calendarEntry')
			.where('id', '=', itemId)
			.execute();
	}
}
