import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidTenantException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidTenantException';
import {ValidateDeleteTenantRepo} from '@copor/core/domain/Components/Tenant/repository/ValidateDeleteTenantRepo';
import {ValidateDeleteTenantDTO} from '@copor/core/domain/Components/Tenant/validations/dto/ValidateDeleteTenantDTO';
import {ValidateDeleteTenant} from '@copor/core/domain/Components/Tenant/validations/ValidateDeleteTenant';
import {DeletionNotAllowedException} from '@copor/core/domain/Core/Exceptions/DeletionNotAllowedException';

describe('validate delete tenant tests', () => {
	let mockPermissonRepo: jest.Mocked<PermissionRepository>;
	let mockStorageRepo: jest.Mocked<ValidateDeleteTenantRepo>;
	let input: ValidateDeleteTenantDTO;

	beforeEach(() => {
		mockPermissonRepo = {
			isAllowed: jest.fn()
		};
		mockStorageRepo = {
			isInvalidTenant: jest.fn(),
			entityHasReferences: jest.fn()
		};
		input = {
			actorId: 'unique_id',
			tenantId: 'unique_tenant_id'
		};
		mockStorageRepo.isInvalidTenant.mockResolvedValue(false);
		mockPermissonRepo.isAllowed.mockResolvedValue(true);
		mockStorageRepo.entityHasReferences.mockResolvedValue(false);
	});
	it('should throw error if user has no permission to delete tenant', async() => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissonRepo.isAllowed.mockResolvedValue(false);
		const validator = new ValidateDeleteTenant(input, mockPermissonRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
	it('should throw error if tenant is invalid', async () => {
		const errorList = new ErrorList([new InvalidTenantException()]);

		mockStorageRepo.isInvalidTenant.mockResolvedValue(true);
		const validator = new ValidateDeleteTenant(input, mockPermissonRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('Should throw error if tenant has references', async () => {
		const errorList = new ErrorList([new DeletionNotAllowedException('x')]);

		mockStorageRepo.entityHasReferences.mockResolvedValue({tableName: 'x'});
		const validator = new ValidateDeleteTenant(input, mockPermissonRepo, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});