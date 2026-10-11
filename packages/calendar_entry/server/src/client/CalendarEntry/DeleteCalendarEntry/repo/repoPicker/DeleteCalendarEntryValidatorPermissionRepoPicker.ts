import {AppContext} from '@copor/core/client/Interface/AppContext';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {
	ContextualPermissionRepoPicker
} from '@copor/core/client/Core/Repository/ContextualRepository/ContextualPermissionRepoPicker';
import {
	ValidateCanDeleteCalendarEntryContext
} from '@copor/calendar_entry/domain/CalendarEntry/validation/validator/ValidateCanDeleteCalendarEntry';
import {
	KyselyDeleteCalendarEntryValidatorPermissionRepo
} from '@copor/calendar_entry/client/CalendarEntry/DeleteCalendarEntry/repo/kysely/KyselyDeleteCalendarEntryValidatorPermissionRepo';

export class DeleteCalendarEntryValidatorPermissionRepoPicker
	extends ContextualPermissionRepoPicker<ValidateCanDeleteCalendarEntryContext> {
	protected getKyselyRepo():
	new (appContext: AppContext) => PermissionRepository<ValidateCanDeleteCalendarEntryContext> {
		return KyselyDeleteCalendarEntryValidatorPermissionRepo;
	}
}
