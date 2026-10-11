import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateUpdateUserGroup} from '@copor/core/domain/UserGroup/validation/ValidateUpdateUserGroup';
import {
	ValidateUpdateUserGroupDTO
} from '@copor/core/domain/UserGroup/validation/dto/ValidateUpdateUserGroupDTO';
import {ValidateUpdateUserGroupRepo} from '@copor/core/domain/UserGroup/repository/ValidateUpdateUserGroupRepo';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidUserGroupException} from '@copor/core/domain/UserGroup/exception/InvalidUserGroupException';

describe('Validate update UserGroup tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateUpdateUserGroupRepo>;
	let validator: ValidateUpdateUserGroup;
	let input: ValidateUpdateUserGroupDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidUserGroup: jest.fn()
		};
		input = {
			actorId: 'actorId',
			userGroupId: 'ugid'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidUserGroup.mockResolvedValue(false);
	});

	it('Should throw error if user is not authorized to update UserGroup', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateUpdateUserGroup(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if user group is invalid', async () => {
		const errorList = new ErrorList([new InvalidUserGroupException()]);

		mockStorageRepo.isInvalidUserGroup.mockResolvedValue(true);
		validator = new ValidateUpdateUserGroup(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
