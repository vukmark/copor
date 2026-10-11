import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {IsCalendarEntryOverlappingRepo} from '@copor/calendar_entry/domain/CalendarEntry/repository/IsCalendarEntryOverlappingRepo';
import {CalendarEntryOverlapException} from '@copor/calendar_entry/domain/CalendarEntry/exception/CalendarEntryOverlapException';

export interface ValidateIsCalendarEntryOverlappingDTO {
	startDate: Date;
	endDate: Date;
	userId: string;
	excludedCalendarEntryId?: string;
}

/**
 * Manually managed calendar entries may not overlap one another.
 */
export class ValidateIsCalendarEntryOverlapping
	extends ValidatorWithRepo<IsCalendarEntryOverlappingRepo, ValidateIsCalendarEntryOverlappingDTO> {
	public async validate(): Promise<void> {
		if (await this.repository.isCalendarEntryOverlapping(this.input))
			throw new CalendarEntryOverlapException();
	}
}
