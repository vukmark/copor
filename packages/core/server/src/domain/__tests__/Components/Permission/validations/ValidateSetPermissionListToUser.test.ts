import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {
	ValidateSetPermissionListToUserRepo
} from '@copor/core/domain/Components/Permission/repository/ValidateSetPermissionListToUserRepo';
import {
	ValidateSetPermissionListToUser
} from '@copor/core/domain/Components/Permission/validations/ValidateSetPermissionListToUser';
import {
	ValidateSetPermissionListToUserDTO
} from '@copor/core/domain/Components/Permission/validations/dto/ValidateSetPermissionListToUserDTO';
import {InvalidUserException} from '@copor/core/domain/User/exception/InvalidUserException';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';
import {PermissionScope} from '@copor/core/domain/Core/enum/PermissionScope';

describe('validate set permission list to user tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateSetPermissionListToUserRepo>;
	let validator: ValidateSetPermissionListToUser;
	let input: ValidateSetPermissionListToUserDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isNotValidUser: jest.fn()
		};
		input = {
			userId: 'someId',
			permissionList: [{
				permissionType: CorePermission.canCreateUser,
				scope: PermissionScope.ALL,
					effect: PermissionEffect.ALLOW
			}],
			actorId: 'aId'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isNotValidUser.mockResolvedValue(false);
	});

	it('should throw error if user is not authorized to set permissions to users', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateSetPermissionListToUser(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if user is invalid', async () => {
		const errorList = new ErrorList([new InvalidUserException()]);

		mockStorageRepo.isNotValidUser.mockResolvedValue(true);
		validator = new ValidateSetPermissionListToUser(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});