import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateDeleteCalendarEntry} from '@copor/calendar_entry/domain/CalendarEntry/validation/ValidateDeleteCalendarEntry';
import {
	ValidateDeleteCalendarEntryDTO
} from '@copor/calendar_entry/domain/CalendarEntry/validation/dto/ValidateDeleteCalendarEntryDTO';
import {
	ValidateDeleteCalendarEntryRepo
} from '@copor/calendar_entry/domain/CalendarEntry/repository/ValidateDeleteCalendarEntryRepo';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {
	InvalidCalendarEntryException
} from '@copor/calendar_entry/domain/CalendarEntry/exception/InvalidCalendarEntryException';

describe('Validate delete CalendarEntry tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateDeleteCalendarEntryRepo>;
	let validator: ValidateDeleteCalendarEntry;
	let input: ValidateDeleteCalendarEntryDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidCalendarEntry: jest.fn()
		};
		input = {
			id: 'id',
			actorId: 'actorId'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidCalendarEntry.mockResolvedValue(false);
	});

	it('Should throw error if user is not authorized to delete CalendarEntry', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateDeleteCalendarEntry(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if calendar entry is invalid', async () => {
		const errorList = new ErrorList([new InvalidCalendarEntryException()]);

		mockStorageRepo.isInvalidCalendarEntry.mockResolvedValue(true);
		validator = new ValidateDeleteCalendarEntry(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
