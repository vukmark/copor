import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {
	ValidateGetCalendarEntryList,
	ValidateGetCalendarEntryListDTO
} from '@copor/calendar_entry/domain/CalendarEntry/validation/ValidateGetCalendarEntryList';

describe('Validate get CalendarEntry list tests', () => {
	it('Should throw error if user has no permission', async () => {
		const mockPermissionRepo: jest.Mocked<PermissionRepository> = {
			isAllowed: jest.fn()
		};
		const input: ValidateGetCalendarEntryListDTO = {
			actorId: 'actor-id',
			userId: 'user-id'
		};
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator = new ValidateGetCalendarEntryList(input, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
