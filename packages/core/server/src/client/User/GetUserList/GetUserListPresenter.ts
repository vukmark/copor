import {GetUserDTO} from '@copor/core/domain/User/interactor/dto/GetUserDTO';
import {ImageHelper} from '@copor/core/client/Core/Helpers/ImageHelper';
import {PaginatedPresenter} from '@copor/core/client/Core/Presenter/PaginatedPresenter';
import {GetUserViewModel} from '@copor/core/client/User/GetUser/GetUserViewModel';

export class GetUserListPresenter extends PaginatedPresenter<GetUserDTO, GetUserViewModel> {
	protected mapItem(dto: GetUserDTO): GetUserViewModel {
		return {
			id: dto.id,
			firstName: dto.firstName,
			lastName: dto.lastName,
			picturePath: ImageHelper.getProfileImageURL(dto.imageName, dto.imageExtension, this.appContext),
			role: dto.role,
			isDefaultRole: dto.isDefaultRole,
			isActive: dto.isActive
		};
	}
}