import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetUserContactInformationViewModel} from './GetUserContactInformationViewModel';


import {GetUserContactInformationDTO} from '@copor/contacts/domain/Contacts/interactor/dto/GetUserContactInformationDTO';

export class GetUserContactInformationPresenter
	extends PresenterInstance<GetUserContactInformationDTO, GetUserContactInformationViewModel> {
	present(): GetUserContactInformationViewModel {
		return {
			... this.input,
			firstName: this.input.firstName!,
			lastName: this.input.lastName!,
			salutation: this.input.salutation!
		};
	}
}
