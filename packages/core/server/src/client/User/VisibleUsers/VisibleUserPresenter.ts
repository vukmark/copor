import {VisibleUserViewModel} from './VisibleUserViewModel';
import {VisibleUserDTO} from '@copor/core/domain/User/VisibleUsers/interactor/dto/VisibleUserDTO';
import {PaginatedPresenter} from '@copor/core/client/Core/Presenter/PaginatedPresenter';
import {ImageHelper} from '@copor/core/client/Core/Helpers/ImageHelper';

export class VisibleUserPresenter extends PaginatedPresenter<VisibleUserDTO, VisibleUserViewModel> {
	protected mapItem(dto: VisibleUserDTO): VisibleUserViewModel {
		return {
			id: dto.id,
			fullName: `${dto.firstName} ${dto.lastName}`.trim(),
			picture: ImageHelper.getProfileImageUrlOrEmptyString(dto.imageName, dto.imageExtension, this.appContext),
			isActive: dto.isActive
		};
	}
}
