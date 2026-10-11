import {AppContext} from '@copor/core/client/Interface/AppContext';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {
	ContextualPermissionRepoPicker
} from '@copor/core/client/Core/Repository/ContextualRepository/ContextualPermissionRepoPicker';
import {
	ValidateCanGetCalendarEntryContext
} from '@copor/calendar_entry/domain/CalendarEntry/validation/validator/ValidateCanGetCalendarEntry';
import {
	KyselyGetCalendarEntryValidatorPermissionRepo
} from '@copor/calendar_entry/client/CalendarEntry/GetCalendarEntry/repo/kysely/KyselyGetCalendarEntryValidatorPermissionRepo';

export class GetCalendarEntryValidatorPermissionRepoPicker
	extends ContextualPermissionRepoPicker<ValidateCanGetCalendarEntryContext> {
	protected getKyselyRepo():
	new (appContext: AppContext) => PermissionRepository<ValidateCanGetCalendarEntryContext> {
		return KyselyGetCalendarEntryValidatorPermissionRepo;
	}
}
