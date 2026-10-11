import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {CalendarEntryPermission} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryPermission';
import {
	UserPermissionContext
} from '@copor/core/client/Core/Repository/ContextualRepository/KyselyUserPermissionRepo';

export class ValidateCanCreateCalendarEntry extends PermissionValidator<UserPermissionContext> {
	public getPermissionType(): PermissionType {
		return CalendarEntryPermission.canCreateCalendarEntry;
	}
}
