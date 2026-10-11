import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateGetUserRepo} from '@copor/core/domain/User/repository/ValidateGetUserRepo';
import {ValidateGetUserDTO} from '@copor/core/domain/User/validation/dto/ValidateGetUserDTO';
import {ValidateGetUser} from '@copor/core/domain/User/validation/ValidateGetUser';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidUserException} from '@copor/core/domain/User/exception/InvalidUserException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

describe('Test validate get user', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateGetUserRepo>;
	let validator: ValidateGetUser;
	let input: ValidateGetUserDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isNotValidUser: jest.fn()
		};
		input = {
			actorId: 'actor-id',
			userId: 'uniqueId'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isNotValidUser.mockResolvedValue(false);
	});

	it('should throw error if user is invalid', async () => {
		const errorList = new ErrorList([new InvalidUserException()]);

		mockStorageRepo.isNotValidUser.mockResolvedValue(true);
		validator = new ValidateGetUser(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if user has no permission to get user', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateGetUser(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});

