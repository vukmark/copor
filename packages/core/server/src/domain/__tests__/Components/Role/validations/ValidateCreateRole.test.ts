import {ValidateCreateRole} from '@copor/core/domain/Components/Role/validations/ValidateCreateRole';
import {ValidateCreateRoleRepo} from '@copor/core/domain/Components/Role/repository/ValidateCreateRoleRepo';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {SaveRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/SaveRoleDTO';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

describe('validate create role tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateCreateRoleRepo>;
	let validator: ValidateCreateRole;
	let inputDTO: SaveRoleDTO;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidRole: jest.fn()
		};
		inputDTO = {
			id: 'some-id',
			name: 'name',
			type: RoleType.USER,
			actorId: 'user-id'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidRole.mockResolvedValue(false);
	});

	it('should throw error if user is not allowed to create role', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateCreateRole(inputDTO, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
