import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidRoleException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidRoleException';
import {
	ValidateSetPermissionListToRoleRepo
} from '@copor/core/domain/Components/Permission/repository/ValidateSetPermissionListToRoleRepo';
import {
	ValidateSetPermissionListToRole
} from '@copor/core/domain/Components/Permission/validations/ValidateSetPermissionListToRole';
import {
	ValidateSetPermissionListToRoleDTO
} from '@copor/core/domain/Components/Permission/validations/dto/ValidateSetPermissionListToRoleDTO';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';
import {PermissionScope} from '@copor/core/domain/Core/enum/PermissionScope';

describe('validate set permission list to role tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateSetPermissionListToRoleRepo>;
	let validator: ValidateSetPermissionListToRole;
	let input: ValidateSetPermissionListToRoleDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidRole: jest.fn()
		};
		input = {
			roleId: 'someId',
			permissionList: [{
				permissionType: CorePermission.canCreateRole,
				scope: PermissionScope.ALL,
					effect: PermissionEffect.ALLOW
			}],
			actorId: 'aId'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidRole.mockResolvedValue(false);
	});

	it('should throw error if user is not authorized to set permissions to roles', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateSetPermissionListToRole(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if role is invalid', async () => {
		const errorList = new ErrorList([new InvalidRoleException()]);

		mockStorageRepo.isInvalidRole.mockResolvedValue(true);
		validator = new ValidateSetPermissionListToRole(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});