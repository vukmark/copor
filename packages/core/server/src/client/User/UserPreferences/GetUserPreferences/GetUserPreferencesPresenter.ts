import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetUserPreferencesDTO} from '@copor/core/domain/User/UserPreferences/interactor/dto/GetUserPreferencesDTO';
import {GetUserPreferencesViewModel} from './GetUserPreferencesViewModel';

export class GetUserPreferencesPresenter extends PresenterInstance<GetUserPreferencesDTO, GetUserPreferencesViewModel> {
	present(): GetUserPreferencesViewModel {
		return {
			... this.input,
			contactPrivacy: {
				picture: Boolean(this.input.contactPrivacy.picture),
				tenant: Boolean(this.input.contactPrivacy.tenant),
				email: Boolean(this.input.contactPrivacy.email),
				group: Boolean(this.input.contactPrivacy.group),
				private: Boolean(this.input.contactPrivacy.private),
				dateOfBirth: Boolean(this.input.contactPrivacy.dateOfBirth)
			},
			authentication: {
				faceId: Boolean(this.input.authentication.faceId),
				fingerprint: Boolean(this.input.authentication.fingerprint),
				lockAppId: Boolean(this.input.authentication.lockAppId)
			}
		};
	}
}
