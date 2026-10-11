import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {ImageHelper} from '@copor/core/client/Core/Helpers/ImageHelper';
import {
	GetUserAccountInformationViewModel
} from '@copor/core/client/AccountInformation/GetUserAccountInformation/GetUserAccountInformationViewModel';
import {GetUserAccountInformationDTO} from '@copor/core/domain/User/interactor/dto/GetUserAccountInformationDTO';
import {dateTimeToString} from '@copor/core/client/Core/Helpers/DateTransformer';

export class GetUserAccountInformationPresenter
	extends PresenterInstance<GetUserAccountInformationDTO, GetUserAccountInformationViewModel> {
	public present(): GetUserAccountInformationViewModel {
		return {
			id: this.input.id,
			firstName: this.input.firstName ?? '',
			lastName: this.input.lastName ?? '',
			username: this.input.userName ?? '',
			picture: ImageHelper.getProfileImageUrlOrEmptyString(this.input.pictureName, this.input.pictureExtension, this.appContext),
			address: this.input.address,
			citizenship: this.input.citizenship,
			email: this.input.email,
			salutation: this.input.salutation ?? undefined,
			gender: this.input.gender ?? undefined,
			qualifications: this.input.qualifications ?? undefined,
			roleType: this.input.roleType,
			registrationDate: this.input.registrationDate
				? dateTimeToString(this.input.registrationDate)
				: undefined,
			lastVisitedDate: this.input.lastVisitedDate
				? dateTimeToString(this.input.lastVisitedDate)
				: undefined,
			nativeLanguage: this.input.nativeLanguage,
			nickName: this.input.nickname ?? undefined,
			placeOfBirth: this.input.placeOfBirth ?? undefined,
			dateOfBirth: this.input.dateOfBirth ? this.input.dateOfBirth.toISOString() : undefined,
			phoneNumberList: this.input.phoneNumberList.map((phone) => ({
				id: phone.id,
				user: phone.user,
				phoneNumber: phone.phoneNumber,
				phoneNumberType: phone.phoneNumberType
			})),
			contactNote: this.input.contactNote ?? undefined,
			isActive: this.input.isActive === undefined ? undefined : Boolean(this.input.isActive),
			deletionRequested: this.input.deletionRequested
		};
	}
}
