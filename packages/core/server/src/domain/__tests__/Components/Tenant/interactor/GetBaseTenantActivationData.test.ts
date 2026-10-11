import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {
	GetTenantActivationDataDTO
} from '@copor/core/domain/Components/Tenant/TenantRegistration/interactor/dto/GetTenantActivationDataDTO';
import {
	GetTenantActivationData
} from '@copor/core/domain/Components/Tenant/TenantRegistration/interactor/GetTenantActivationData';

describe('get base tenant registration data test', () => {
	const mockRepo: jest.Mocked<GetItem<GetTenantActivationDataDTO>> = {
		load: jest.fn()
	};

	const expectedResponse: GetTenantActivationDataDTO = {
		id: 'tenantId',
		name: 'tenantName',
		isBaseTenant: true,
		contractSigned: true,
		email: 'tenantEmail'
	};
	const interactor: GetTenantActivationData = new GetTenantActivationData('id', mockRepo);

	it('should return acyivity type based on provided id', async () => {
		mockRepo.load.mockResolvedValue(expectedResponse);

		expect(await interactor.execute()).toEqual(expectedResponse);
	});
});
