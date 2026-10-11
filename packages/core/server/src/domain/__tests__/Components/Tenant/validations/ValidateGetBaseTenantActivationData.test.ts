import {
	ValidateGetTenantActivationDataRepo
} from '@copor/core/domain/Components/Tenant/TenantRegistration/repository/ValidateGetTenantActivationDataRepo';
import {
	ValidateGetTenantActivationDataDTO
} from '@copor/core/domain/Components/Tenant/TenantRegistration/validations/dto/ValidateGetTenantActivationDataDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {
	ValidateGetTenantActivationData
} from '@copor/core/domain/Components/Tenant/TenantRegistration/validations/ValidateGetTenantActivationData';
import {InvalidTenantException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidTenantException';
import {NotBaseTenantException} from '@copor/core/domain/Core/Exceptions/NotBaseTenantException';
import {
	TenantAlreadyActivatedException
} from '@copor/core/domain/Components/Tenant/TenantRegistration/exception/TenantAlreadyActivatedException';

describe('get base tenant registration data validator tests', () => {
	const mockStorageRepo: jest.Mocked<ValidateGetTenantActivationDataRepo> = {
		isInvalidTenant: jest.fn(),
		isNotBaseTenant: jest.fn(),
		isNotContractSigned: jest.fn(),
		tenantAlreadyActivated: jest.fn()
	};
	const input: ValidateGetTenantActivationDataDTO = {
		tenantId: 'tenantId'
	};

	beforeEach(() => {
		mockStorageRepo.isInvalidTenant.mockResolvedValue(false);
		mockStorageRepo.isNotBaseTenant.mockResolvedValue(false);
		mockStorageRepo.isNotContractSigned.mockResolvedValue(false);
	});

	it('should throw error if tenant is invalid', async () => {
		const errorList = new ErrorList([new InvalidTenantException()]);

		mockStorageRepo.isInvalidTenant.mockResolvedValue(true);
		const validator = new ValidateGetTenantActivationData(input, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	it('should throw error if tenant not base tenant', async () => {
		const errorList = new ErrorList([new NotBaseTenantException()]);

		mockStorageRepo.isNotBaseTenant.mockResolvedValue(true);
		const validator = new ValidateGetTenantActivationData(input, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});

	// it('should throw error if contract not signed', async () => {
	// 	const errorList = new ErrorList([new NotContractSignedException()]);
	//
	// 	mockStorageRepo.isNotContractSigned.mockResolvedValue(true);
	// 	const validator = new ValidateGetTenantActivationData(input, mockStorageRepo);
	// 	const result = await validator.validate();
	//
	// 	expect(result).toStrictEqual(errorList);
	// });

	it('should throw error if tenant already activated', async () => {
		const errorList = new ErrorList([new TenantAlreadyActivatedException()]);

		mockStorageRepo.tenantAlreadyActivated.mockResolvedValue(true);

		const validator = new ValidateGetTenantActivationData(input, mockStorageRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});