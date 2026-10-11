import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {IsInvalidCalendarEntryRepo} from '@copor/calendar_entry/domain/CalendarEntry/repository/IsInvalidCalendarEntryRepo';
import {InvalidCalendarEntryException} from '@copor/calendar_entry/domain/CalendarEntry/exception/InvalidCalendarEntryException';

export class ValidateCalendarEntry
	extends ValidatorWithRepo<IsInvalidCalendarEntryRepo, string | undefined> {
	public async validate(): Promise<void> {
		if (await this.repository.isInvalidCalendarEntry(this.input))
			throw new InvalidCalendarEntryException();
	}
}
