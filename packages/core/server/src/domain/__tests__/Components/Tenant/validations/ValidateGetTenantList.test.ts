import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateGetTenantList} from '@copor/core/domain/Components/Tenant/validations/ValidateGetTenantList';

describe('get tenant list validator tests', () => {
	const mockPermissionRepo: jest.Mocked<PermissionRepository> = {
		isAllowed: jest.fn()
	};
	const validateGetTenantList: ValidateGetTenantList = new ValidateGetTenantList('user-id', mockPermissionRepo);

	it('should throw error if user does not have permission', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const result = await validateGetTenantList.validate();

		expect(result).toStrictEqual(errorList);
	});
});
