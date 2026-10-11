import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {GetTenant} from '@copor/core/domain/Components/Tenant/interactor/GetTenant';
import {GetTenantDTO} from '@copor/core/domain/Components/Tenant/interactor/dto/GetTenantDTO';

describe('get tenant interactor tests', () => {
	const mockRepo: jest.Mocked<GetItem<GetTenantDTO>> = {
		load: jest.fn()
	};
	const expectedResponse: GetTenantDTO = {
		id: 'tenant-001',
		name: 'Test Tenant Hamburg',
		isBaseTenant: true,
		regionId: 'region-001',
		regionCityId: 'region-city-001',
		addressStreet: 'Main Street 123',
		postalCode: '20095',
		city: 'Hamburg',
		countryName: 'Germany',
		countryId: 'DE',
		stateName: 'Hamburg',
		stateId: 'HH',
		publishStatus: PublishStatus.published,
		email: 'tenant@test.com',
		phone: '+49 123 456789',
		contactName: 'Jane Doe',
		contactDepartment: 'Administration',
		contactAddress: 'Second Street 45',
		contactPostalCode: '20096',
		contactCity: 'Hamburg',
		contactPhone: '+49 987 654321',
		contactEmail: 'contact@test.com',
		latitude: 53.5511,
		longitude: 9.9937
	};
	const getTenant: GetTenant = new GetTenant('tenant-id', mockRepo);

	it('should return tenant for given ID', async () => {
		mockRepo.load.mockResolvedValue(expectedResponse);
		expect(await getTenant.execute()).toEqual(expectedResponse);
	});
});
