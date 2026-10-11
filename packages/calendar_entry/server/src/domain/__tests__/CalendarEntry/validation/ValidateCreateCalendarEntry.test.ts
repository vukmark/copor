import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateCreateCalendarEntry} from '@copor/calendar_entry/domain/CalendarEntry/validation/ValidateCreateCalendarEntry';
import {
	ValidateCreateCalendarEntryDTO
} from '@copor/calendar_entry/domain/CalendarEntry/validation/dto/ValidateCreateCalendarEntryDTO';
import {
	ValidateCreateCalendarEntryRepo
} from '@copor/calendar_entry/domain/CalendarEntry/repository/ValidateCreateCalendarEntryRepo';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidDatePairException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidDatePairException';
import {CalendarEntryType} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryType';
import {
	CalendarEntryOverlapException
} from '@copor/calendar_entry/domain/CalendarEntry/exception/CalendarEntryOverlapException';
import {
	InvalidCalendarEntryTypeException
} from '@copor/calendar_entry/domain/CalendarEntry/exception/InvalidCalendarEntryTypeException';

describe('Validate create CalendarEntry tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateCreateCalendarEntryRepo>;
	let validator: ValidateCreateCalendarEntry;
	let input: ValidateCreateCalendarEntryDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isCalendarEntryOverlapping: jest.fn()
		};
		input = {
			actorId: 'actorId',
			userId: 'sid',
			type: CalendarEntryType.TRAVEL,
			startDate: new Date(1998, 1, 1),
			endDate: new Date(1999, 1, 1)
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isCalendarEntryOverlapping.mockResolvedValue(false);
	});

	it('Should throw error if user is not authorized to create CalendarEntry', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateCreateCalendarEntry(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if type is not a manually managed category', async () => {
		const errorList = new ErrorList([new InvalidCalendarEntryTypeException()]);

		input.type = 'UNKNOWN_TYPE' as CalendarEntryType;
		validator = new ValidateCreateCalendarEntry(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if date pair is invalid', async () => {
		const errorList = new ErrorList([new InvalidDatePairException()]);

		input.startDate = new Date(2000, 1, 1);
		validator = new ValidateCreateCalendarEntry(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('Should throw error if time span overlaps an existing calendar entry', async () => {
		const errorList = new ErrorList([new CalendarEntryOverlapException()]);

		mockStorageRepo.isCalendarEntryOverlapping.mockResolvedValue(true);
		validator = new ValidateCreateCalendarEntry(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
