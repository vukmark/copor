import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateGetAllPermissionRepo} from '@copor/core/domain/Components/Permission/repository/ValidateGetAllPermissionRepo';
import {
	ValidateGetAllPermissionsForUser
} from '@copor/core/domain/Components/Permission/validations/ValidateGetAllPermissionsForUser';
import {
	ValidateGetAllPermissionsForUserDTO
} from '@copor/core/domain/Components/Permission/validations/dto/ValidateGetAllPermissionsForUserDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';

describe('validate get all permissions for user tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateGetAllPermissionRepo>;
	let validator: ValidateGetAllPermissionsForUser;
	let input: ValidateGetAllPermissionsForUserDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isNotValidUser: jest.fn()
		};
		input = {
			userId: 'userId',
			actorId: 'actorId'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isNotValidUser.mockResolvedValue(false);
	});

	it('should throw error if user is not authorized to set permissions to users', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateGetAllPermissionsForUser(input, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});