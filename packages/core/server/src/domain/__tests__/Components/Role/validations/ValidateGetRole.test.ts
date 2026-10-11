import {ValidateGetRoleInputDTO} from '@copor/core/domain/Components/Role/validations/dto/ValidateGetRoleInputDTO';
import {ValidateGetRole} from '@copor/core/domain/Components/Role/validations/ValidateGetRole';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateGetRoleRepo} from '@copor/core/domain/Components/Role/repository/ValidateGetRoleRepo';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {InvalidRoleException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidRoleException';

describe('test validate get role', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateGetRoleRepo>;
	const inputDTO: ValidateGetRoleInputDTO = {
		actorId: 'actor-id',
		roleId: 'role-id'
	};

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidRole: jest.fn()
		};
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidRole.mockResolvedValue(false);
	});

	it('should throw error if user has no permission to get role', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator: ValidateGetRole = new ValidateGetRole(inputDTO, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if role is invalid', async () => {
		const errorList = new ErrorList([new InvalidRoleException()]);

		mockStorageRepo.isInvalidRole.mockResolvedValue(true);
		const validator: ValidateGetRole = new ValidateGetRole(inputDTO, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});