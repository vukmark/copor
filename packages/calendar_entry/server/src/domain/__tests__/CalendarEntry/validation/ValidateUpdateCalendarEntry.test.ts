import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateUpdateCalendarEntry} from '@copor/calendar_entry/domain/CalendarEntry/validation/ValidateUpdateCalendarEntry';
import {
	ValidateUpdateCalendarEntryDTO
} from '@copor/calendar_entry/domain/CalendarEntry/validation/dto/ValidateUpdateCalendarEntryDTO';
import {
	ValidateUpdateCalendarEntryRepo
} from '@copor/calendar_entry/domain/CalendarEntry/repository/ValidateUpdateCalendarEntryRepo';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidDatePairException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidDatePairException';
import {CalendarEntryType} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryType';
import {
	CalendarEntryOverlapException
} from '@copor/calendar_entry/domain/CalendarEntry/exception/CalendarEntryOverlapException';
import {
	InvalidCalendarEntryException
} from '@copor/calendar_entry/domain/CalendarEntry/exception/InvalidCalendarEntryException';
import {
	InvalidCalendarEntryTypeException
} from '@copor/calendar_entry/domain/CalendarEntry/exception/InvalidCalendarEntryTypeException';

describe('Validate update CalendarEntry tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateUpdateCalendarEntryRepo>;
	let validator: ValidateUpdateCalendarEntry;
	let input: ValidateUpdateCalendarEntryDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidCalendarEntry: jest.fn(),
			isCalendarEntryOverlapping: jest.fn()
		};
		input = {
			id: 'id',
			actorId: 'actorId',
			userId: 'sid',
			type: CalendarEntryType.HOLIDAYS,
			startDate: new Date(1998, 1, 1),
			endDate: new Date(1999, 1, 1)
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidCalendarEntry.mockResolvedValue(false);
		mockStorageRepo.isCalendarEntryOverlapping.mockResolvedValue(false);
	});

	it('Should throw error if user is not authorized to update CalendarEntry', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateUpdateCalendarEntry(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if calendar entry is invalid', async () => {
		const errorList = new ErrorList([new InvalidCalendarEntryException()]);

		mockStorageRepo.isInvalidCalendarEntry.mockResolvedValue(true);
		validator = new ValidateUpdateCalendarEntry(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if type is not a manually managed category', async () => {
		const errorList = new ErrorList([new InvalidCalendarEntryTypeException()]);

		input.type = 'UNKNOWN_TYPE' as CalendarEntryType;
		validator = new ValidateUpdateCalendarEntry(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if date pair is invalid', async () => {
		const errorList = new ErrorList([new InvalidDatePairException()]);

		input.startDate = new Date(2000, 1, 1);
		validator = new ValidateUpdateCalendarEntry(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if time span overlaps another calendar entry', async () => {
		const errorList = new ErrorList([new CalendarEntryOverlapException()]);

		mockStorageRepo.isCalendarEntryOverlapping.mockResolvedValue(true);
		validator = new ValidateUpdateCalendarEntry(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should exclude the entry being edited from the overlap check', async () => {
		validator = new ValidateUpdateCalendarEntry(input, mockPermissionRepo, mockStorageRepo);
		await validator.validate();

		expect(mockStorageRepo.isCalendarEntryOverlapping).toHaveBeenCalledWith({
			startDate: input.startDate,
			endDate: input.endDate,
			userId: input.userId,
			excludedCalendarEntryId: input.id
		});
	});
});
