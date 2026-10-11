import {ValidateDeleteRoleRepo} from '@copor/core/domain/Components/Role/repository/ValidateDeleteRoleRepo';
import {ValidateGetRoleInputDTO} from '@copor/core/domain/Components/Role/validations/dto/ValidateGetRoleInputDTO';
import {ValidateDeleteRole} from '@copor/core/domain/Components/Role/validations/ValidateDeleteRole';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidRoleException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidRoleException';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {DefaultRoleException} from '@copor/core/domain/Components/Role/exception/DefaultRoleException';
import {DeletionNotAllowedException} from '@copor/core/domain/Core/Exceptions/DeletionNotAllowedException';

describe('validate delete role', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateDeleteRoleRepo>;
	let input: ValidateGetRoleInputDTO;
	let validator: ValidateDeleteRole;

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidRole: jest.fn(),
			isDefaultRoleForRoleType: jest.fn(),
			entityHasReferences: jest.fn()
		};
		input = {
			roleId: 'unique-id',
			actorId: 'actor-id'
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidRole.mockResolvedValue(false);
		mockStorageRepo.isDefaultRoleForRoleType.mockResolvedValue(false);
		mockStorageRepo.entityHasReferences.mockResolvedValue(false);
	});

	it('should throw error if user is not authorized for deleting role', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		validator = new ValidateDeleteRole(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if role id is invalid', async () => {
		const errorList = new ErrorList([new InvalidRoleException()]);

		mockStorageRepo.isInvalidRole.mockResolvedValue(true);
		validator = new ValidateDeleteRole(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if RoleForRoleType id is invalid', async () => {
		const errorList = new ErrorList([new DefaultRoleException()]);

		mockStorageRepo.isDefaultRoleForRoleType.mockResolvedValue(true);
		validator = new ValidateDeleteRole(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if Has References id is invalid', async () => {
		const errorList = new ErrorList([
			new DeletionNotAllowedException('x')
		]);

		mockStorageRepo.entityHasReferences.mockResolvedValue({tableName: 'x'});
		validator = new ValidateDeleteRole(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();


		expect(result).toStrictEqual(errorList);
	});
});
