import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetTenantDTO} from '@copor/core/domain/Components/Tenant/interactor/dto/GetTenantDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

export class FakeGetTenantListInteractorRepo implements ListItems<GetTenantDTO> {
	public list(input: ListRepoInputDTO): Promise<GetTenantDTO[]> {
		return new Promise((resolve) => {
			resolve(
				[
					{
						id: 'TEN-456',
						name: 'Example Organisation',
						isBaseTenant: false,
						addressStreet: 'Friedrichstraße 15',
						regionId: 'region-id',
						regionCityId: 'region-city-id',
						postalCode: '10117',
						city: 'Berlin',
						countryId: 'cid',
						countryName: 'cn',
						stateId: 'sid',
						stateName: 'sn',
						publishStatus: PublishStatus.published,
						email: 'kontakt@example.com',
						phone: '+49 30 9876543',
						contactName: 'Anna Müller',
						contactDepartment: 'Verwaltung',
						contactAddress: 'Friedrichstraße 15, Büro 205',
						contactPostalCode: '10117',
						contactCity: 'Berlin',
						contactPhone: '+49 30 9876544',
						contactEmail: 'anna.mueller@example.com',
						latitude: 3.567456,
						longitude: 5.567456,
					}
				]
			);
		});
	}
}
