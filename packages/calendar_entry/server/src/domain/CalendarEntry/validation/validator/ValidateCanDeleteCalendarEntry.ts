import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {CalendarEntryPermission} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryPermission';

export interface ValidateCanDeleteCalendarEntryContext {
	calendarEntryId: string;
}

export class ValidateCanDeleteCalendarEntry
	extends PermissionValidator<ValidateCanDeleteCalendarEntryContext> {
	public getPermissionType(): PermissionType {
		return CalendarEntryPermission.canDeleteCalendarEntry;
	}
}
