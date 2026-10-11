import {AppContext} from '@copor/core/client/Interface/AppContext';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {
	ContextualPermissionRepoPicker
} from '@copor/core/client/Core/Repository/ContextualRepository/ContextualPermissionRepoPicker';
import {UserPermissionContext} from '@copor/core/client/Core/Repository/ContextualRepository/KyselyUserPermissionRepo';
import {
	KyselyCreateCalendarEntryValidatorPermissionRepo
} from '@copor/calendar_entry/client/CalendarEntry/CreateCalendarEntry/repo/kysely/KyselyCreateCalendarEntryValidatorPermissionRepo';

export class CreateCalendarEntryValidatorPermissionRepoPicker
	extends ContextualPermissionRepoPicker<UserPermissionContext> {
	protected getKyselyRepo(): new (appContext: AppContext) => PermissionRepository<UserPermissionContext> {
		return KyselyCreateCalendarEntryValidatorPermissionRepo;
	}
}
