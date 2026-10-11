import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateCreateUserGroup} from '@copor/core/domain/UserGroup/validation/ValidateCreateUserGroup';
import {
	ValidateCreateUserGroupDTO
} from '@copor/core/domain/UserGroup/validation/dto/ValidateCreateUserGroupDTO';
import {ValidateCreateUserGroupRepo} from '@copor/core/domain/UserGroup/repository/ValidateCreateUserGroupRepo';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidUserGroupException} from '@copor/core/domain/UserGroup/exception/InvalidUserGroupException';

describe('Validate create UserGroup tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateCreateUserGroupRepo>;
	let validator: ValidateCreateUserGroup;
	let input: ValidateCreateUserGroupDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidUserGroup: jest.fn()
		};
		input = {
			actorId: 'actorId',
			parentGroupId: 'pgid'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidUserGroup.mockResolvedValue(false);
	});

	it('Should throw error if user is not authorized to create UserGroup', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateCreateUserGroup(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if parent user group is invalid', async () => {
		const errorList = new ErrorList([new InvalidUserGroupException()]);

		mockStorageRepo.isInvalidUserGroup.mockResolvedValue(true);
		validator = new ValidateCreateUserGroup(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
