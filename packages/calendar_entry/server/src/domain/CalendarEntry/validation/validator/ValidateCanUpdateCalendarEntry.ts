import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {CalendarEntryPermission} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryPermission';

export interface ValidateCanUpdateCalendarEntryContext {
	calendarEntryId: string;
}

export class ValidateCanUpdateCalendarEntry
	extends PermissionValidator<ValidateCanUpdateCalendarEntryContext> {
	public getPermissionType(): PermissionType {
		return CalendarEntryPermission.canUpdateCalendarEntry;
	}
}
