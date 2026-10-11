import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetMessageDTO} from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/GetMessageDTO';
import {
	GetMessageViewModel
} from '@copor/vu_meet/client/VuMeet/Message/GetMessageList/GetMessageListController';
import i18next from 'i18next';
import {MessageContentFormatter} from '@copor/vu_meet/client/VuMeet/Core/Helper/MessageContentFormatter';
import {ImageHelper} from '@copor/core/client/Core/Helpers/ImageHelper';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {MessageContentType} from '@copor/vu_meet/domain/VuMeet/Core/enum/MessageContentType';

export class GetMessageListPresenter
	extends PresenterInstance<GetMessageDTO[], GetMessageViewModel[]> {
	private actorId: string;
	constructor(props: GetMessageDTO[], actorId: string, appContext: AppContext) {
		super(props, appContext);
		this.actorId = actorId;
	}

	public present(): GetMessageViewModel[] {
		i18next.setDefaultNamespace('vu_meet');
		return this.input.map((message) => {
			return {
				id: message.id,
				// FILE/PICTURE content is the raw filename, used by the frontend to fetch/render
				// the attachment - it must stay untouched here, unlike the generic "Sent a
				// file" substitution formatContent applies for chat-list/notification previews.
				messageContent: message.type === MessageContentType.CALL_EVENT
					|| message.type === MessageContentType.FILE
					|| message.type === MessageContentType.PICTURE
					? message.content
					: MessageContentFormatter.formatContent({
						... message,
						actorId: this.actorId
					}),
				senderPicture: ImageHelper.getProfileImageUrlOrEmptyString(message.senderPictureName, message.senderPictureExtension, this.appContext),
				senderName: message.senderFirstName + ' ' + message.senderLastName,
				isOwn: message.senderId == this.actorId,
				isSeen: Boolean(message.seen),
				isPrivate: Boolean(message.isPrivate),
				senderId: message.senderId,
				dateCreated: this.formatDate(message.createdAt),
				timeCreated: this.formatTime(message.createdAt),
				createdAt: message.createdAt.toISOString(),
				isLastFromUser: false,
				isFirstFromUser: true,
				messageStatus: message.type,
				isSending: false,
				type: message.type
			};
		});
	}

	private formatDate(date: Date) {
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();

		return `${day}.${month}.${year}`;
	}

	private formatTime(date: Date) {
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');

		return `${hours}:${minutes}`;
	}
}