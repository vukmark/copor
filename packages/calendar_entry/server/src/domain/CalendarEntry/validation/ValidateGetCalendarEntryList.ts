import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {
	ValidateCanGetCalendarEntryList,
	ValidateCanGetCalendarEntryListContext
} from '@copor/calendar_entry/domain/CalendarEntry/validation/validator/ValidateCanGetCalendarEntryList';

export interface ValidateGetCalendarEntryListDTO {
	actorId: string;
	userId: string;
}

export class ValidateGetCalendarEntryList
	extends ValidationWithPermission<ValidateGetCalendarEntryListDTO, ValidateCanGetCalendarEntryListContext> {
	public getValidators(): Validator[] {
		const context: ValidateCanGetCalendarEntryListContext = {userId: this.input.userId};

		return [
			new ValidateCanGetCalendarEntryList(this.permissionRepo, this.input.actorId, context)
		];
	}
}
