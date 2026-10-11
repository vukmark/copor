import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateDatePair} from '@copor/core/domain/Core/Validations/Validators/ValidateDatePair';
import {
	ValidateUpdateCalendarEntryDTO
} from '@copor/calendar_entry/domain/CalendarEntry/validation/dto/ValidateUpdateCalendarEntryDTO';
import {
	ValidateUpdateCalendarEntryRepo
} from '@copor/calendar_entry/domain/CalendarEntry/repository/ValidateUpdateCalendarEntryRepo';
import {
	ValidateCanUpdateCalendarEntry,
	ValidateCanUpdateCalendarEntryContext
} from '@copor/calendar_entry/domain/CalendarEntry/validation/validator/ValidateCanUpdateCalendarEntry';
import {
	ValidateCalendarEntry
} from '@copor/calendar_entry/domain/CalendarEntry/validation/validator/ValidateCalendarEntry';
import {
	ValidateCalendarEntryType
} from '@copor/calendar_entry/domain/CalendarEntry/validation/validator/ValidateCalendarEntryType';
import {
	ValidateIsCalendarEntryOverlapping
} from '@copor/calendar_entry/domain/CalendarEntry/validation/validator/ValidateIsCalendarEntryOverlapping';

export class ValidateUpdateCalendarEntry extends ValidationWithPermissionAndRepo<
	ValidateUpdateCalendarEntryDTO, ValidateUpdateCalendarEntryRepo, ValidateCanUpdateCalendarEntryContext> {
	public getValidators(): Validator[] {
		const context: ValidateCanUpdateCalendarEntryContext = {calendarEntryId: this.input.id};

		return [
			new ValidateCanUpdateCalendarEntry(this.permissionRepo, this.input.actorId, context),
			new ValidateCalendarEntry(this.storageRepo, this.input.id),
			new ValidateCalendarEntryType(this.input.type),
			new ValidateDatePair(this.input.startDate, this.input.endDate),
			new ValidateIsCalendarEntryOverlapping(this.storageRepo, {
				startDate: this.input.startDate,
				endDate: this.input.endDate,
				userId: this.input.userId,
				excludedCalendarEntryId: this.input.id
			})
		];
	}
}
