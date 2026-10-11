import {PaginatedPresenter} from '@copor/core/client/Core/Presenter/PaginatedPresenter';
import {ImageHelper} from '@copor/core/client/Core/Helpers/ImageHelper';
import {GetUserGroupUserListDTO} from '@copor/core/domain/UserGroup/interactor/dto/GetUserGroupUserListDTO';
import {GetUserGroupUserListViewModel} from '@copor/core/client/UserGroup/GetUserGroupUserList/GetUserGroupUserListViewModel';

export class GetUserGroupUserListPresenter
	extends PaginatedPresenter<GetUserGroupUserListDTO, GetUserGroupUserListViewModel> {
	protected mapItem(user: GetUserGroupUserListDTO): GetUserGroupUserListViewModel {
		return {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			profilePicture: ImageHelper.getProfileImageUrlOrEmptyString(user.imageName, user.imageExtension, this.appContext)
		};
	}
}
