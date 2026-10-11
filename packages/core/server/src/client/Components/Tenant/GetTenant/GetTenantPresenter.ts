import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetTenantDTO} from '@copor/core/domain/Components/Tenant/interactor/dto/GetTenantDTO';
import {GetTenantViewModel} from './GetTenantViewModel';

export class GetTenantPresenter extends PresenterInstance<GetTenantDTO, GetTenantViewModel> {
	present(): GetTenantViewModel {
		return {
			id: this.input.id,
			name: this.input.name,
			isBaseTenant: Boolean(this.input.isBaseTenant),
			address: this.input.addressStreet,
			postalCode: this.input.postalCode,
			city: this.input.city,
			country: {
				name: this.input.countryName,
				id: this.input.countryId
			},
			state: {
				name: this.input.stateName,
				id: this.input.stateId
			},
			publishStatus: this.input.publishStatus,
			email: this.input.email,
			phoneNumber: this.input.phone,
			contactName: this.input.contactName,
			contactDepartment: this.input.contactDepartment,
			contactAddress: this.input.contactAddress,
			contactPostalCode: this.input.contactPostalCode,
			contactCity: this.input.contactCity,
			contactPhone: this.input.contactPhone,
			contactEmail: this.input.contactEmail,
			latitude: this.input.latitude,
			longitude: this.input.longitude
		};
	}
}
