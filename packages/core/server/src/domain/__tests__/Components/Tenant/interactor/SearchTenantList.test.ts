import {SearchTenantListDTO} from '@copor/core/domain/Components/Tenant/interactor/dto/SearchTenantListDTO';
import {SearchTenantListRepo} from '@copor/core/domain/Components/Tenant/repository/SearchTenantListRepo';
import {SearchTenantList} from '@copor/core/domain/Components/Tenant/interactor/SearchTenantList';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

describe('Search tenant list by string', () => {
	const mockSearchTenantListRepo: jest.Mocked<SearchTenantListRepo> = {
		search: jest.fn()
	};
	const input = 'someSearchString';
	const mockedResponse: SearchTenantListDTO[] = [
		{
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
		}
	];
	const getTenantList: SearchTenantList = new SearchTenantList(input, mockSearchTenantListRepo);

	it('should return a tenant', async () => {
		mockSearchTenantListRepo.search.mockResolvedValue(mockedResponse);
		expect(await getTenantList.execute()).toEqual(mockedResponse);
	});
});