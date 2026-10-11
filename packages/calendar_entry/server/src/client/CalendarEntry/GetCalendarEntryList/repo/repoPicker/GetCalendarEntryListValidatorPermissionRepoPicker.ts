import {AppContext} from '@copor/core/client/Interface/AppContext';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {
	ContextualPermissionRepoPicker
} from '@copor/core/client/Core/Repository/ContextualRepository/ContextualPermissionRepoPicker';
import {
	ValidateCanGetCalendarEntryListContext
} from '@copor/calendar_entry/domain/CalendarEntry/validation/validator/ValidateCanGetCalendarEntryList';
import {
	KyselyGetCalendarEntryListValidatorPermissionRepo
} from '@copor/calendar_entry/client/CalendarEntry/GetCalendarEntryList/repo/kysely/KyselyGetCalendarEntryListValidatorPermissionRepo';

export class GetCalendarEntryListValidatorPermissionRepoPicker
	extends ContextualPermissionRepoPicker<ValidateCanGetCalendarEntryListContext> {
	protected getKyselyRepo():
	new (appContext: AppContext) => PermissionRepository<ValidateCanGetCalendarEntryListContext> {
		return KyselyGetCalendarEntryListValidatorPermissionRepo;
	}
}
