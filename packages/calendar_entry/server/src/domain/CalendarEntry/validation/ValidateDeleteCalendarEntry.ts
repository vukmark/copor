import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {
	ValidateDeleteCalendarEntryDTO
} from '@copor/calendar_entry/domain/CalendarEntry/validation/dto/ValidateDeleteCalendarEntryDTO';
import {
	ValidateDeleteCalendarEntryRepo
} from '@copor/calendar_entry/domain/CalendarEntry/repository/ValidateDeleteCalendarEntryRepo';
import {
	ValidateCanDeleteCalendarEntry,
	ValidateCanDeleteCalendarEntryContext
} from '@copor/calendar_entry/domain/CalendarEntry/validation/validator/ValidateCanDeleteCalendarEntry';
import {
	ValidateCalendarEntry
} from '@copor/calendar_entry/domain/CalendarEntry/validation/validator/ValidateCalendarEntry';

export class ValidateDeleteCalendarEntry extends ValidationWithPermissionAndRepo<
	ValidateDeleteCalendarEntryDTO, ValidateDeleteCalendarEntryRepo, ValidateCanDeleteCalendarEntryContext> {
	public getValidators(): Validator[] {
		const context: ValidateCanDeleteCalendarEntryContext = {calendarEntryId: this.input.id};

		return [
			new ValidateCanDeleteCalendarEntry(this.permissionRepo, this.input.actorId, context),
			new ValidateCalendarEntry(this.storageRepo, this.input.id)
		];
	}
}
