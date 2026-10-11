import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateGetNotificationList} from '@copor/core/domain/Components/Notification/validations/ValidateGetNotificationList';
import {
	ValidateGetNotificationListDTO
} from '@copor/core/domain/Components/Notification/validations/dto/ValidateGetNotificationListDTO';

describe('validate get notification list tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let validator: ValidateGetNotificationList;
	let input: ValidateGetNotificationListDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		input = {
			userId: 'uid'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
	});
	it('should throw error if user has no permission to get todo', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);

		validator = new ValidateGetNotificationList(input, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
