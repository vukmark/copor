import {db} from '@copor/core/client/AppDataSource';
import {KyselyUserPermissionRepo} from '@copor/core/client/Core/Repository/ContextualRepository/KyselyUserPermissionRepo';
import {
	ValidateCanDeleteCalendarEntryContext
} from '@copor/calendar_entry/domain/CalendarEntry/validation/validator/ValidateCanDeleteCalendarEntry';

export class KyselyDeleteCalendarEntryValidatorPermissionRepo
	extends KyselyUserPermissionRepo<ValidateCanDeleteCalendarEntryContext> {
	protected async getUserIdFromContext(context: ValidateCanDeleteCalendarEntryContext): Promise<string> {
		return (await db.selectFrom('calendarEntry')
			.select('userId')
			.where('id', '=', context.calendarEntryId)
			.executeTakeFirst())!.userId;
	}
}
