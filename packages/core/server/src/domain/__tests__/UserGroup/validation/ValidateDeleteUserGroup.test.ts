import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ValidateDeleteUserGroup} from '@copor/core/domain/UserGroup/validation/ValidateDeleteUserGroup';
import {
	ValidateDeleteUserGroupDTO
} from '@copor/core/domain/UserGroup/validation/dto/ValidateDeleteUserGroupDTO';
import {ValidateDeleteUserGroupRepo} from '@copor/core/domain/UserGroup/repository/ValidateDeleteUserGroupRepo';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {UserGroupHasChildrenException} from '@copor/core/domain/UserGroup/exception/UserGroupHasChildrenException';

describe('Validate delete UserGroup tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateDeleteUserGroupRepo>;
	let validator: ValidateDeleteUserGroup;
	let input: ValidateDeleteUserGroupDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidUserGroup: jest.fn(),
			doesUserGroupHaveChildren: jest.fn(),
			isUserGroupSpecial: jest.fn(),
			entityHasReferences: jest.fn()
		};
		input = {
			actorId: 'actorId',
			userGroupId: 'ugid'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidUserGroup.mockResolvedValue(false);
		mockStorageRepo.doesUserGroupHaveChildren.mockResolvedValue(false);
		mockStorageRepo.isUserGroupSpecial.mockResolvedValue(false);
		mockStorageRepo.entityHasReferences.mockResolvedValue(false);
	});

	it('Should throw error if user is not authorized to delete UserGroup', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateDeleteUserGroup(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if user group has children', async () => {
		const errorList = new ErrorList([new UserGroupHasChildrenException()]);

		mockStorageRepo.doesUserGroupHaveChildren.mockResolvedValue(true);
		validator = new ValidateDeleteUserGroup(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
