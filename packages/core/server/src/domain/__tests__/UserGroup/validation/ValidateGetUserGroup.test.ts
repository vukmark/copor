import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ValidateGetUserGroup} from '@copor/core/domain/UserGroup/validation/ValidateGetUserGroup';
import {ValidateGetUserGroupDTO} from '@copor/core/domain/UserGroup/validation/dto/ValidateGetUserGroupDTO';
import {ValidateGetUserGroupRepo} from '@copor/core/domain/UserGroup/repository/ValidateGetUserGroupRepo';
import {InvalidUserGroupException} from '@copor/core/domain/UserGroup/exception/InvalidUserGroupException';

describe('Test validate get UserGroup', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateGetUserGroupRepo>;
	const input: ValidateGetUserGroupDTO = {
		actorId: 'actorID',
		userGroupId: 'ugid'
	};

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};

		mockStorageRepo = {
			isInvalidUserGroup: jest.fn()
		};

		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidUserGroup.mockResolvedValue(false);
	});

	it('Should throw error if user does not have permission', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator: ValidateGetUserGroup = new ValidateGetUserGroup(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if user group is invalid', async () => {
		const errorList = new ErrorList([new InvalidUserGroupException()]);

		mockStorageRepo.isInvalidUserGroup.mockResolvedValue(true);
		const validator: ValidateGetUserGroup = new ValidateGetUserGroup(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});