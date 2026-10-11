import {GetUnreadMessageCountForUserDTO} from '@copor/vu_meet/domain/VuMeet/Core/interactor/dto/GetUnreadMessageCountForUserDTO';
import {GetUnreadMessageCountForUserRepo} from '@copor/vu_meet/domain/VuMeet/Core/repository/GetUnreadMessageCountForUserRepo';

export class FakeGetUnreadMessageCountForUserInteractorRepo implements GetUnreadMessageCountForUserRepo {
	getUnreadMessageCountForUser(userId: string): Promise<GetUnreadMessageCountForUserDTO> {
		return Promise.resolve({
			unreadMessages: 5,
			lastMessageChatName: 'Simo',
			lastMessageContent: 'dje si',
			lastMessageChatPictureName: 'picture',
			lastMessageIsChatPrivate: true,
			lastMessageChatId: 'cId'
		});
	}
}
