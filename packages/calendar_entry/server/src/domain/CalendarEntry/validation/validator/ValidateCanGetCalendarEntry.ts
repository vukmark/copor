import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {CalendarEntryPermission} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryPermission';

export interface ValidateCanGetCalendarEntryContext {
	calendarEntryId: string;
}

export class ValidateCanGetCalendarEntry
	extends PermissionValidator<ValidateCanGetCalendarEntryContext> {
	public getPermissionType(): PermissionType {
		return CalendarEntryPermission.canGetCalendarEntry;
	}
}
