import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetUserAccountInformationForDisplayDTO}
	from '@copor/core/domain/User/AccountInformation/interactor/dto/GetUserAccountInformationForDisplayDTO';
import {GetUserAccountInformationForDisplayViewModel}
	from '@copor/core/client/AccountInformation/GetUserAccountInformationForDisplay/GetUserAccountInformationForDisplayViewModel';
import {dateTimeToString} from '@copor/core/client/Core/Helpers/DateTransformer';
import {ImageHelper} from '@copor/core/client/Core/Helpers/ImageHelper';

export class GetUserAccountInformationForDisplayPresenter
	extends PresenterInstance<GetUserAccountInformationForDisplayDTO, GetUserAccountInformationForDisplayViewModel> {
	public present(): GetUserAccountInformationForDisplayViewModel {
		return {
			id: this.input.id,
			firstName: this.input.firstName ?? '',
			lastName: this.input.lastName ?? '',
			picture: ImageHelper.getProfileImageUrlOrEmptyString(this.input.pictureName, this.input.pictureExtension, this.appContext),
			userName: this.input.userName ?? '',
			address: this.input.address,
			citizenship: this.input.citizenship,
			email: this.input.email ?? '',
			salutation: this.input.salutation,
			nickName: this.input.nickname,
			registrationDate: dateTimeToString(this.input.registrationDate),
			lastVisitedDate: this.input.lastVisitedDate
				? dateTimeToString(this.input.lastVisitedDate)
				: undefined,
			roleType: this.input.roleType
		};
	}
}
