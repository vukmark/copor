import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateGetCalendarEntry} from '@copor/calendar_entry/domain/CalendarEntry/validation/ValidateGetCalendarEntry';
import {
	ValidateGetCalendarEntryDTO
} from '@copor/calendar_entry/domain/CalendarEntry/validation/dto/ValidateGetCalendarEntryDTO';
import {
	ValidateGetCalendarEntryRepo
} from '@copor/calendar_entry/domain/CalendarEntry/repository/ValidateGetCalendarEntryRepo';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {
	InvalidCalendarEntryException
} from '@copor/calendar_entry/domain/CalendarEntry/exception/InvalidCalendarEntryException';

describe('Validate get CalendarEntry tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateGetCalendarEntryRepo>;
	let validator: ValidateGetCalendarEntry;
	let input: ValidateGetCalendarEntryDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidCalendarEntry: jest.fn()
		};
		input = {
			calendarEntryId: 'id',
			actorId: 'actorId'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidCalendarEntry.mockResolvedValue(false);
	});

	it('Should throw error if user is not authorized to get CalendarEntry', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateGetCalendarEntry(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if calendar entry is invalid', async () => {
		const errorList = new ErrorList([new InvalidCalendarEntryException()]);

		mockStorageRepo.isInvalidCalendarEntry.mockResolvedValue(true);
		validator = new ValidateGetCalendarEntry(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
