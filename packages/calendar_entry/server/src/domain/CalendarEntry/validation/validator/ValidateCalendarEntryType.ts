import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {CalendarEntryType} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryType';
import {
	InvalidCalendarEntryTypeException
} from '@copor/calendar_entry/domain/CalendarEntry/exception/InvalidCalendarEntryTypeException';

/**
 * Only the categories in CalendarEntryType may be written through this API.
 */
export class ValidateCalendarEntryType implements Validator {
	private readonly type: CalendarEntryType;

	public constructor(type: CalendarEntryType) {
		this.type = type;
	}

	public validate(): Promise<void> {
		return new Promise((resolve, reject) => {
			if (!Object.values(CalendarEntryType).includes(this.type))
				reject(new InvalidCalendarEntryTypeException());
			resolve();
		});
	}
}
