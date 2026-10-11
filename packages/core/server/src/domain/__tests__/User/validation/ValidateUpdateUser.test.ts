import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidUserException} from '@copor/core/domain/User/exception/InvalidUserException';
import {ValidateUpdateUserDTO} from '@copor/core/domain/User/validation/dto/ValidateUpdateUserDTO';
import {ValidateUpdateUser} from '@copor/core/domain/User/validation/ValidateUpdateUser';
import {ValidateUpdateUserRepo} from '@copor/core/domain/User/repository/ValidateUpdateUserRepo';

describe('validate user update test', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateUpdateUserRepo>;
	let validator: ValidateUpdateUser;
	let input: ValidateUpdateUserDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isNotValidUser: jest.fn()
		};
		input = {
			id: 'someId',
			username: 'user.name',
			email: 'a@a.com',
			password: 'password',
			isActive: false,
			actorId: 'actorId'
		};
		mockStorageRepo.isNotValidUser.mockResolvedValue(false);
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
	});

	it('should throw error if user is not allowed to update an user', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateUpdateUser(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if user is not valid', async () => {
		const errorList = new ErrorList([new InvalidUserException()]);

		mockStorageRepo.isNotValidUser.mockResolvedValue(true);
		validator = new ValidateUpdateUser(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});