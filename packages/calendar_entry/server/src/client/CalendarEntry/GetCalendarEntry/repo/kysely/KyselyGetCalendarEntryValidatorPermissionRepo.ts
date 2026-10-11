import {db} from '@copor/core/client/AppDataSource';
import {KyselyUserPermissionRepo} from '@copor/core/client/Core/Repository/ContextualRepository/KyselyUserPermissionRepo';
import {
	ValidateCanGetCalendarEntryContext
} from '@copor/calendar_entry/domain/CalendarEntry/validation/validator/ValidateCanGetCalendarEntry';

export class KyselyGetCalendarEntryValidatorPermissionRepo
	extends KyselyUserPermissionRepo<ValidateCanGetCalendarEntryContext> {
	protected async getUserIdFromContext(context: ValidateCanGetCalendarEntryContext): Promise<string> {
		return (await db.selectFrom('calendarEntry')
			.select('userId')
			.where('id', '=', context.calendarEntryId)
			.executeTakeFirst())!.userId;
	}
}
