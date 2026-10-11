import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';

import {
	SearchMessagesInChatDTO
} from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/SearchMessagesInChatDTO';


export interface SearchMessagesInChatViewModel {
	messageId: string;
	messageContent: string;
	senderId: string;
	senderName: string;
	senderPicture: string;
	createdAt: Date;
}

export class SearchMessagesInChatPresenter
	extends PresenterInstance<SearchMessagesInChatDTO[], SearchMessagesInChatViewModel[]> {
	public present(): SearchMessagesInChatViewModel[] {
		return this.input.map((message) => {
			return {... message,
				senderName: message.senderFirstName + ' ' + message.senderLastName,
				senderPicture: message.senderProfileImagePath};
		});
	}
}
