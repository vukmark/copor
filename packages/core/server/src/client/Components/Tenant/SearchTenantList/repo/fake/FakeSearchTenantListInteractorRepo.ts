import {SearchTenantListRepo} from '@copor/core/domain/Components/Tenant/repository/SearchTenantListRepo';
import {SearchTenantListDTO} from '@copor/core/domain/Components/Tenant/interactor/dto/SearchTenantListDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export class FakeSearchTenantListInteractorRepo implements SearchTenantListRepo {
	public search(prompt: string): Promise<SearchTenantListDTO[]> {
		return Promise.resolve(
			[{
				id: '12345',
				name: 'Springfield High Tenant',
				isBaseTenant: true,
				address: '742 Evergreen Terrace',
				postalCode: '12345',
				city: 'Springfield',
				country: 'countryId',
				state: 'stateId',
				publishStatus: PublishStatus.published,
				email: 'info@springfieldhigh.edu',
				phoneNumber: '+1-555-123-4567',
				contractSignedBy: 'John Doe',
				contactName: 'Jane Smith',
				contactDepartment: 'Admissions',
				contactAddress: '123 Main Street',
				contactPostalCode: '54321',
				contactCity: 'Shelbyville',
				contactPhone: '+1-555-987-6543',
				contactEmail: 'jane.smith@springfieldhigh.edu'
			}]
		);
	}
}