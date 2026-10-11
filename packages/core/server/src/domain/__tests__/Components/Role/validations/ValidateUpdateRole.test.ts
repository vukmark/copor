import {SaveRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/SaveRoleDTO';
import {ValidateUpdateRole} from '@copor/core/domain/Components/Role/validations/ValidateUpdateRole';
import {ValidateUpdateRoleRepo} from '@copor/core/domain/Components/Role/repository/ValidateUpdateRoleRepo';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidRoleException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidRoleException';
import {EmptyNameException} from '@copor/core/domain/Core/Exceptions/empty/EmptyNameException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

describe('validate update role', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateUpdateRoleRepo>;
	let validator: ValidateUpdateRole;
	let inputDTO: SaveRoleDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidRole: jest.fn()
		};
		inputDTO = {
			id: 'role-id',
			name: 'name',
			type: RoleType.USER,
			actorId: 'creator-id'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidRole.mockResolvedValue(false);
	});

	it('should throw error if user is not allowed to create role', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateUpdateRole(inputDTO, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if role is invalid', async () => {
		const errorList = new ErrorList([new InvalidRoleException()]);

		mockStorageRepo.isInvalidRole.mockResolvedValue(true);
		validator = new ValidateUpdateRole(inputDTO, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if name is empty', async () => {
		const errorList = new ErrorList([new EmptyNameException()]);

		inputDTO.name = '';
		validator = new ValidateUpdateRole(inputDTO, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
