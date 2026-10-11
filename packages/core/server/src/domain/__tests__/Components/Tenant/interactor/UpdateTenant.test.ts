import {SaveTenantRepo} from '@copor/core/domain/Components/Tenant/repository/SaveTenantRepo';
import {SaveTenantDTO} from '@copor/core/domain/Components/Tenant/interactor/dto/SaveTenantDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {UpdateTenant} from '@copor/core/domain/Components/Tenant/interactor/UpdateTenant';

describe('update tenant interactor test', () => {
	let mockRepo: jest.Mocked<SaveTenantRepo>;
	let input: SaveTenantDTO;
	let updateTenant: UpdateTenant;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		input = {
			id: 'tenant-001',
			name: 'Test Tenant Hamburg',
			isBaseTenant: true,
			addressStreet: 'Musterstraße 12',
			city: 'Hamburg',
			regionCityId: 'region-12345',
			publishStatus: PublishStatus.published,
			email: 'info@testtenant.de',
			phone: '+49 40 987654',
			contractSignedBy: 'Max Mustermann',
			contactName: 'Max Mustermann',
			contactDepartment: 'IT Department',
			contactAddressStreet: 'Kontaktweg 5',
			contactPostalCode: '20095',
			contactCity: 'Hamburg',
			contactPhone: '+49 40 123456',
			contactEmail: 'kontakt@testtenant.de',
			actorId: 'actor-001',
			latitude: 53.5511,
			longitude: 9.9937
		};

		updateTenant = new UpdateTenant(input, mockRepo);
	});
	it('should save data for update', async () => {
		await updateTenant.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});
