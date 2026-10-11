import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {
	ValidateMarkAllNotificationsAsRead
} from '@copor/core/domain/Components/Notification/validations/ValidateMarkAllNotificationsAsRead';
import {
	ValidateMarkAllNotificationsAsReadDTO
} from '@copor/core/domain/Components/Notification/validations/dto/ValidateMarkAllNotificationsAsReadDTO';

describe('validate mark all notifications as read tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let validator: ValidateMarkAllNotificationsAsRead;
	let input: ValidateMarkAllNotificationsAsReadDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		input = {
			userId: 'uid'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
	});
	it('should throw error if user has no permission to mark all notifications as read', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);

		validator = new ValidateMarkAllNotificationsAsRead(input, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});