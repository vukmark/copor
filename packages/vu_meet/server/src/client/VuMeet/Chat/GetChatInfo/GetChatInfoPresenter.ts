import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetChatInfoViewModel} from './GetChatInfoViewModel';
import {GetChatInfoDTO} from '@copor/vu_meet/domain/VuMeet/Chat/interactor/dto/GetChatInfoDTO';
import {ImageHelper} from '@copor/core/client/Core/Helpers/ImageHelper';

export class GetChatInfoPresenter extends PresenterInstance<GetChatInfoDTO, GetChatInfoViewModel> {
	present(): GetChatInfoViewModel {
		console.log(this.input);
		return {
			id: this.input.id,
			name: this.input.isPrivate ? `${this.input.firstName} ${this.input.lastName}` : this.input.name,
			isPrivate: Boolean(this.input.isPrivate),
			isActive: this.input.isPrivate ? Boolean(this.input.isActive) : undefined,
			chatPicture: ImageHelper.getProfileImageUrlOrEmptyString(
				this.input.chatPicture ?? undefined,
				this.input.chatPictureExtension ?? undefined,
				this.appContext
			),
			members: this.input.members.map((member) => {
				return {
					id: member.id,
					name: `${member.firstName} ${member.lastName}`,
					picture: ImageHelper.getProfileImageUrlOrEmptyString(
						member.picture ?? undefined,
						member.pictureExtension ?? undefined,
						this.appContext),
					roleName: member.roleName
				};
			})
		};
	}
}
