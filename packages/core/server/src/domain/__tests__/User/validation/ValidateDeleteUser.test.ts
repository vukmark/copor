import {ValidateDeleteUserRepo} from '@copor/core/domain/User/repository/ValidateDeleteUserRepo';
import {ValidateDeleteUserDTO} from '@copor/core/domain/User/validation/dto/ValidateDeleteUserDTO';
import {ValidateDeleteUser} from '@copor/core/domain/User/validation/ValidateDeleteUser';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidUserException} from '@copor/core/domain/User/exception/InvalidUserException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

describe('test validate delete user', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateDeleteUserRepo>;
	let input: ValidateDeleteUserDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isNotValidUser: jest.fn()
		};
		input = {
			userId: 'section-id',
			actorId: 'actor-id'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isNotValidUser.mockResolvedValue(false);
	});

	it('should throw error if user does not have permission to delete user', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);

		const validator = new ValidateDeleteUser(input, mockPermissionRepo, mockStorageRepo);

		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if user id is invalid', async () => {
		const errorList = new ErrorList([new InvalidUserException()]);
		const validator = new ValidateDeleteUser(input, mockPermissionRepo, mockStorageRepo);

		mockStorageRepo.isNotValidUser.mockResolvedValue(true);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
