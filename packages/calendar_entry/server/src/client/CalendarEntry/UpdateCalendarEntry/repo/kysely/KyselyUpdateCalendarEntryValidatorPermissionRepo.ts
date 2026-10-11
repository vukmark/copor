import {db} from '@copor/core/client/AppDataSource';
import {KyselyUserPermissionRepo} from '@copor/core/client/Core/Repository/ContextualRepository/KyselyUserPermissionRepo';
import {
	ValidateCanUpdateCalendarEntryContext
} from '@copor/calendar_entry/domain/CalendarEntry/validation/validator/ValidateCanUpdateCalendarEntry';

export class KyselyUpdateCalendarEntryValidatorPermissionRepo
	extends KyselyUserPermissionRepo<ValidateCanUpdateCalendarEntryContext> {
	protected async getUserIdFromContext(context: ValidateCanUpdateCalendarEntryContext): Promise<string> {
		return (await db.selectFrom('calendarEntry')
			.select('userId')
			.where('id', '=', context.calendarEntryId)
			.executeTakeFirst())!.userId;
	}
}
