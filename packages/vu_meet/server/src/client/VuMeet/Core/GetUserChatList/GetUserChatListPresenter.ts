import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetUserChatDTO} from '@copor/vu_meet/domain/VuMeet/Core/interactor/dto/GetUserChatDTO';
import {GetUserChatViewModel} from './GetUserChatListController';
import {DateTime} from 'luxon';
import {ImageHelper} from '@copor/core/client/Core/Helpers/ImageHelper';

export class GetUserChatListPresenter extends PresenterInstance<GetUserChatDTO[], GetUserChatViewModel[]> {
	public present(): GetUserChatViewModel[] {
		return this.input.map((user: GetUserChatDTO) => {
			return {
				id: user.id,
				name: user.name,
				isPrivate: Boolean(user.isPrivate),
				picture: ImageHelper.getProfileImageUrlOrEmptyString(user.pictureName, user.pictureExtension, this.appContext),
				createdAt: DateTime.fromJSDate(user.createdAt).setLocale('de').toLocaleString(),
				numberOfUnseenMessages: user.numberOfUnseenMessages,
				lastMessage: user.lastMessage,
				isActive: Boolean(user.isActive) ?? false,
				otherUserId: user.otherUserId
			};
		});
	}
}
