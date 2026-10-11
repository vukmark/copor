import {DeleteTenantRepo} from '@copor/core/domain/Components/Tenant/repository/DeleteTenantRepo';
import {DeleteTenant} from '@copor/core/domain/Components/Tenant/interactor/DeleteTenant';

describe('delete tenant test', () => {
	const mockRepo: jest.Mocked<DeleteTenantRepo> = {
		delete: jest.fn()
	};
	const deleteTenant = new DeleteTenant('tenantId', mockRepo);

	it('should delete a tenant', async () => {
		await deleteTenant.execute();
		expect(mockRepo.delete).toHaveBeenCalledWith('tenantId');
	});
});