import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetContactInfoForUserDTO} from '@copor/contacts/domain/Contacts/interactor/dto/GetContactInfoForUserDTO';
import {GetContactInfoForUserViewModel} from '@copor/contacts/client/Contacts/GetContactInfoForUser/GetContactInfoForUserViewModel';

export class GetContactInfoForUserPresenter extends PresenterInstance<GetContactInfoForUserDTO, GetContactInfoForUserViewModel> {
	public present(): GetContactInfoForUserViewModel {
		return {
			id: this.input.id,
			fullName: `${this.input.firstName} ${this.input.lastName}`.trim(),
			email: this.input.email,
			salutation: this.input.salutation,
			picture: this.input.picture,
			address: this.input.address,
			country: this.input.country,
			state: this.input.state,
			postalCode: this.input.postalCode,
			city: this.input.city,
			phoneNumber: this.input.phoneNumber,
			tenantName: this.input.tenantName,
			tenantAddress: this.input.tenantAddress,
			tenantCountry: this.input.tenantCountry,
			tenantState: this.input.tenantState,
			tenantPostalCode: this.input.tenantPostalCode,
			tenantCity: this.input.tenantCity,
			role: this.input.role,
			jobTitle: this.input.jobTitle,
			isActive: Boolean(this.input.isActive) ?? false
		};
	}
}