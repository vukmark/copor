import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateDatePair} from '@copor/core/domain/Core/Validations/Validators/ValidateDatePair';
import {
	ValidateCreateCalendarEntryDTO
} from '@copor/calendar_entry/domain/CalendarEntry/validation/dto/ValidateCreateCalendarEntryDTO';
import {
	ValidateCreateCalendarEntryRepo
} from '@copor/calendar_entry/domain/CalendarEntry/repository/ValidateCreateCalendarEntryRepo';
import {
	ValidateCanCreateCalendarEntry
} from '@copor/calendar_entry/domain/CalendarEntry/validation/validator/ValidateCanCreateCalendarEntry';
import {
	ValidateCalendarEntryType
} from '@copor/calendar_entry/domain/CalendarEntry/validation/validator/ValidateCalendarEntryType';
import {
	ValidateIsCalendarEntryOverlapping
} from '@copor/calendar_entry/domain/CalendarEntry/validation/validator/ValidateIsCalendarEntryOverlapping';
import {
	UserPermissionContext
} from '@copor/core/client/Core/Repository/ContextualRepository/KyselyUserPermissionRepo';

export class ValidateCreateCalendarEntry extends ValidationWithPermissionAndRepo<
	ValidateCreateCalendarEntryDTO, ValidateCreateCalendarEntryRepo, UserPermissionContext> {
	public getValidators(): Validator[] {
		const context: UserPermissionContext = {
			userId: this.input.userId
		};

		return [
			new ValidateCanCreateCalendarEntry(this.permissionRepo, this.input.actorId, context),
			new ValidateCalendarEntryType(this.input.type),
			new ValidateDatePair(this.input.startDate, this.input.endDate),
			new ValidateIsCalendarEntryOverlapping(this.storageRepo, {
				startDate: this.input.startDate,
				endDate: this.input.endDate,
				userId: this.input.userId
			})
		];
	}
}
