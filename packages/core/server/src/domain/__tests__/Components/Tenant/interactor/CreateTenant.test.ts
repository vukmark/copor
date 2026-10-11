import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {CreateTenant} from '@copor/core/domain/Components/Tenant/interactor/CreateTenant';
import {SaveTenantRepo} from '@copor/core/domain/Components/Tenant/repository/SaveTenantRepo';
import {SaveTenantDTO} from '@copor/core/domain/Components/Tenant/interactor/dto/SaveTenantDTO';

describe('create tenant interactor tests', () => {
	const mockRepo: jest.Mocked<SaveTenantRepo> = {
		save: jest.fn()
	};
	const input: SaveTenantDTO = {
		id: 'id',
		name: 'Test Tenant',
		isBaseTenant: true,
		addressStreet: 'Main Street 123',
		city: 'Hamburg',
		regionCityId: 'region-001',
		publishStatus: PublishStatus.published,
		email: 'tenant@test.com',
		phone: '+49 123 456789',
		contractSignedBy: 'John Doe',
		contactName: 'Jane Doe',
		contactDepartment: 'Administration',
		contactAddressStreet: 'Second Street 45',
		contactPostalCode: '20095',
		contactCity: 'Hamburg',
		contactPhone: '+49 987 654321',
		contactEmail: 'contact@test.com',
		actorId: 'actor-001',
		latitude: 53.5511,
		longitude: 9.9937
	};
	const createTenant: CreateTenant = new CreateTenant(input, mockRepo);

	it('Should save an activity type', async () => {
		const result = await createTenant.execute();

		expect(result).toEqual('id');
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});
