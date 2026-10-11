import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidateSearchTenantList} from '@copor/core/domain/Components/Tenant/validations/ValidateSearchTenantList';

describe('validate search tenant list tests', () => {
	let mockPermissionRepo: jest.Mocked<PermissionRepository>;
	const actorId: string = 'actorId';

	beforeEach(() => {
		mockPermissionRepo = {
			isAllowed: jest.fn()
		};
	});

	it('should throw error if user does not have permission to search tenants', async () => {
		const errorList = new ErrorList([new ForbiddenAccessException()]);

		mockPermissionRepo.isAllowed.mockResolvedValue(false);
		const validator : ValidateSearchTenantList = new ValidateSearchTenantList(actorId, mockPermissionRepo);
		const result = await validator.validate();

		expect(result).toStrictEqual(errorList);
	});
});