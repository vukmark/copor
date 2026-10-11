import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidRoleException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidRoleException';
import {
	ValidateGetRolePermissionList
} from '@copor/core/domain/Components/Permission/validations/ValidateGetRolePermissionList';
import {
	ValidateGetRolePermissionListDTO
} from '@copor/core/domain/Components/Permission/validations/dto/ValidateGetRolePermissionListDTO';
import {
	ValidateGetRolePermissionListRepo
} from '@copor/core/domain/Components/Permission/repository/ValidateGetRolePermissionListRepo';

describe('get role permission list validator tests', () => {
	const mockPermissionRepo: jest.Mocked<PermissionRepository> = {
		isAllowed: jest.fn()
	};
	const mockStorageRepo: jest.Mocked<ValidateGetRolePermissionListRepo> = {
		isInvalidRole: jest.fn()
	};
	const input: ValidateGetRolePermissionListDTO = {
		actorId: 'aid',
		roleId: 'rid'
	};

	beforeEach(() => {
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidRole.mockResolvedValue(false);
	});
	it('should throw error if user is not allowed to get role permission list', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator = new ValidateGetRolePermissionList(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if role is invalid', async () => {
		const errorList = new ErrorList([new InvalidRoleException()]);

		mockStorageRepo.isInvalidRole.mockResolvedValue(true);
		const validator = new ValidateGetRolePermissionList(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
