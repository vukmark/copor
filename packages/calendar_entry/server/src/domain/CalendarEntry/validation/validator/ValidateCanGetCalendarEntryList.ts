import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {CalendarEntryPermission} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryPermission';

export interface ValidateCanGetCalendarEntryListContext {
	userId: string;
}

export class ValidateCanGetCalendarEntryList
	extends PermissionValidator<ValidateCanGetCalendarEntryListContext> {
	public getPermissionType(): PermissionType {
		return CalendarEntryPermission.canGetCalendarEntryList;
	}
}
