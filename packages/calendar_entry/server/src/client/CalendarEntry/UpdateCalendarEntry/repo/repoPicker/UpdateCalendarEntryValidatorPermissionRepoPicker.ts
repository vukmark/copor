import {AppContext} from '@copor/core/client/Interface/AppContext';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {
	ContextualPermissionRepoPicker
} from '@copor/core/client/Core/Repository/ContextualRepository/ContextualPermissionRepoPicker';
import {
	ValidateCanUpdateCalendarEntryContext
} from '@copor/calendar_entry/domain/CalendarEntry/validation/validator/ValidateCanUpdateCalendarEntry';
import {
	KyselyUpdateCalendarEntryValidatorPermissionRepo
} from '@copor/calendar_entry/client/CalendarEntry/UpdateCalendarEntry/repo/kysely/KyselyUpdateCalendarEntryValidatorPermissionRepo';

export class UpdateCalendarEntryValidatorPermissionRepoPicker
	extends ContextualPermissionRepoPicker<ValidateCanUpdateCalendarEntryContext> {
	protected getKyselyRepo():
	new (appContext: AppContext) => PermissionRepository<ValidateCanUpdateCalendarEntryContext> {
		return KyselyUpdateCalendarEntryValidatorPermissionRepo;
	}
}
