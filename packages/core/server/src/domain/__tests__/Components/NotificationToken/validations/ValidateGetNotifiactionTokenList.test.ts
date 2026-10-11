import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidUserException} from '@copor/core/domain/User/exception/InvalidUserException';
import {
	ValidateGetNotificationTokenList
} from '@copor/core/domain/Components/NotificationToken/validations/ValidateGetNotificationTokenList';
import {
	ValidateGetNotificationTokenListDTO
} from '@copor/core/domain/Components/NotificationToken/validations/dto/ValidateGetNotificationTokenListDTO';
import {
	ValidateGetNotificationTokenListRepo
} from '@copor/core/domain/Components/NotificationToken/repository/ValidateGetNotificationTokenListRepo';

describe('validate get notification token list tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateGetNotificationTokenListRepo>;
	let input: ValidateGetNotificationTokenListDTO;
	let validator: ValidateGetNotificationTokenList;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isNotValidUser: jest.fn()
		};
		input = {
			userId: 'user-id',
			actorId: 'actor-id'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isNotValidUser.mockResolvedValue(false);
	});
	it('should throw error if user has no permission to get notification token list', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);

		validator = new ValidateGetNotificationTokenList(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if user id is invalid', async () => {
		const errorList = new ErrorList([new InvalidUserException()]);

		mockStorageRepo.isNotValidUser.mockResolvedValue(true);
		validator = new ValidateGetNotificationTokenList(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
