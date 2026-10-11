import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidTenantException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidTenantException';
import {ValidateGetTenant} from '@copor/core/domain/Components/Tenant/validations/ValidateGetTenant';
import {ValidateGetTenantDTO} from '@copor/core/domain/Components/Tenant/validations/dto/ValidateGetTenantDTO';
import {ValidateGetTenantRepo} from '@copor/core/domain/Components/Tenant/validations/dto/ValidateGetTenantRepo';

describe('get tenant validator tests', () => {
	const mockPermissionRepo: jest.Mocked<PermissionRepository> = {
		isAllowed: jest.fn()
	};
	const mockStorageRepo: jest.Mocked<ValidateGetTenantRepo> = {
		isInvalidTenant: jest.fn()
	};
	const input: ValidateGetTenantDTO = {
		actorId: 'aid',
		tenantId: 'sid'
	};

	beforeEach(() => {
		mockPermissionRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.isInvalidTenant.mockResolvedValue(false);
	});
	it('should throw error if user is not allowed to get tenant', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator: ValidateGetTenant = new ValidateGetTenant(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if tenant id is invalid', async () => {
		const errorList = new ErrorList([new InvalidTenantException()]);

		mockStorageRepo.isInvalidTenant.mockResolvedValue(true);
		const validator: ValidateGetTenant = new ValidateGetTenant(input, mockPermissionRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});
