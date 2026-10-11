import {KyselyUserPermissionRepo} from '@copor/core/client/Core/Repository/ContextualRepository/KyselyUserPermissionRepo';
import {
	ValidateCanGetCalendarEntryListContext
} from '@copor/calendar_entry/domain/CalendarEntry/validation/validator/ValidateCanGetCalendarEntryList';

export class KyselyGetCalendarEntryListValidatorPermissionRepo
	extends KyselyUserPermissionRepo<ValidateCanGetCalendarEntryListContext> {
	protected getUserIdFromContext(context: ValidateCanGetCalendarEntryListContext): Promise<string> {
		return Promise.resolve(context.userId);
	}
}
