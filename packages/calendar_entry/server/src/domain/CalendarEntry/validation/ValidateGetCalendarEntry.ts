import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {
	ValidateGetCalendarEntryDTO
} from '@copor/calendar_entry/domain/CalendarEntry/validation/dto/ValidateGetCalendarEntryDTO';
import {
	ValidateGetCalendarEntryRepo
} from '@copor/calendar_entry/domain/CalendarEntry/repository/ValidateGetCalendarEntryRepo';
import {
	ValidateCanGetCalendarEntry,
	ValidateCanGetCalendarEntryContext
} from '@copor/calendar_entry/domain/CalendarEntry/validation/validator/ValidateCanGetCalendarEntry';
import {
	ValidateCalendarEntry
} from '@copor/calendar_entry/domain/CalendarEntry/validation/validator/ValidateCalendarEntry';

export class ValidateGetCalendarEntry extends ValidationWithPermissionAndRepo<
	ValidateGetCalendarEntryDTO, ValidateGetCalendarEntryRepo, ValidateCanGetCalendarEntryContext> {
	public getValidators(): Validator[] {
		const context: ValidateCanGetCalendarEntryContext = {calendarEntryId: this.input.calendarEntryId};

		return [
			new ValidateCanGetCalendarEntry(this.permissionRepo, this.input.actorId, context),
			new ValidateCalendarEntry(this.storageRepo, this.input.calendarEntryId)
		];
	}
}
