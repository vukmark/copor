import {ActivateTenant} from '@copor/core/domain/Components/Tenant/TenantRegistration/interactor/ActivateTenant';
import {ActivateTenantRepo} from '@copor/core/domain/Components/Tenant/TenantRegistration/repository/ActivateTenantRepo';
import {ActivateTenantDTO} from '@copor/core/domain/Components/Tenant/TenantRegistration/interactor/dto/ActivateTenantDTO';

describe('Test activate base tenant/ create tenant admin', () => {
	let activateBaseTenant: ActivateTenant;
	let mockRepo: jest.Mocked<ActivateTenantRepo>;
	let inputDTO: ActivateTenantDTO;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		inputDTO = {
			id: 'tenantId',
			firstName: 'firstName',
			lastName: 'lastName',
			userName: 'john',
			actorId: 'actorID',
			tenantId: 'tenantID'
		};
		activateBaseTenant = new ActivateTenant(inputDTO, mockRepo);
	});
	it('Should save inactive tenant admin user/ activate base tenant', async () => {
		const result = await activateBaseTenant.execute();

		expect(result).toEqual('tenantId');
		expect(mockRepo.save).toHaveBeenCalledWith(inputDTO);
	});
});