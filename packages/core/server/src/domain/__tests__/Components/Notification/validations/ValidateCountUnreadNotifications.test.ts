import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {
	ValidateCountUnreadNotifications
} from '@copor/core/domain/Components/Notification/validations/ValidateCountUnreadNotifications';
import {
	ValidateCountUnreadNotificationsDTO
} from '@copor/core/domain/Components/Notification/validations/dto/ValidateCountUnreadNotificationsDTO';

describe('validate count unread notifications tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let validator: ValidateCountUnreadNotifications;
	let input: ValidateCountUnreadNotificationsDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		input = {
			userId: 'uid'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
	});
	it('should throw error if user has no permission to count unread notifications', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);

		validator = new ValidateCountUnreadNotifications(input, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});