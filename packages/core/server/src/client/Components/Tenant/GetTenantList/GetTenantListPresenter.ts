import {GetTenantViewModel} from '../GetTenant/GetTenantViewModel';
import {GetTenantDTO} from '@copor/core/domain/Components/Tenant/interactor/dto/GetTenantDTO';
import {PaginatedPresenter} from '@copor/core/client/Core/Presenter/PaginatedPresenter';

export class GetTenantListPresenter extends PaginatedPresenter<GetTenantDTO, GetTenantViewModel> {
	protected mapItem(dto: GetTenantDTO): GetTenantViewModel {
		return {
			id: dto.id,
			name: dto.name,
			isBaseTenant: Boolean(dto.isBaseTenant),
			address: dto.addressStreet,
			postalCode: dto.postalCode,
			city: dto.city,
			country: {
				id: dto.countryId,
				name: dto.countryName
			},
			state: {
				id: dto.stateId,
				name: dto.stateName
			},
			publishStatus: dto.publishStatus,
			email: dto.email,
			phoneNumber: dto.phone,
			contactName: dto.contactName,
			contactDepartment: dto.contactDepartment,
			contactAddress: dto.contactAddress,
			contactPostalCode: dto.contactPostalCode,
			contactCity: dto.contactCity,
			contactPhone: dto.contactPhone,
			contactEmail: dto.contactEmail,
			latitude: dto.latitude,
			longitude: dto.longitude
		};
	}
}
