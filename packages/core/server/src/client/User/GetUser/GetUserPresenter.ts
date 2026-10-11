import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetUserViewModel} from '@copor/core/client/User/GetUser/GetUserViewModel';
import {GetUserDTO} from '@copor/core/domain/User/interactor/dto/GetUserDTO';
import {ImageHelper} from '@copor/core/client/Core/Helpers/ImageHelper';

export class GetUserPresenter extends PresenterInstance<GetUserDTO, GetUserViewModel> {
	present(): GetUserViewModel {
		return {
			id: this.input.id,
			firstName: this.input.firstName,
			lastName: this.input.lastName,
			picturePath: ImageHelper.getProfileImageURL(this.input.imageName, this.input.imageExtension, this.appContext),
			role: this.input.role,
			isDefaultRole: this.input.isDefaultRole,
			isActive: this.input.isActive
		};
	}
}