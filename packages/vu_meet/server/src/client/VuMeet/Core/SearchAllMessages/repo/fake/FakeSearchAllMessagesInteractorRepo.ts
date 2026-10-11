import {SearchAllMessagesDTO} from '@copor/vu_meet/domain/VuMeet/Core/interactor/dto/SearchAllMessagesDTO';
import {SearchAllMessagesRepo} from '@copor/vu_meet/domain/VuMeet/Core/repository/SearchAllMessagesRepo';

export class FakeSearchAllMessagesInteractorRepo implements SearchAllMessagesRepo {
	search(prompt: string, actorId: string): Promise<SearchAllMessagesDTO[]> {
		return Promise.resolve([{
			chatId: 'cid',
			chatName: 'name',
			chatPicture: 'picture',
			isPrivate: true,
			messageId: 'mid',
			senderId: 'sid',
			senderName: 'sendername',
			senderPicture: 'picture',
			createdAt: new Date(1, 1, 1002, 21, 33, 2, 2),
			messageContent: 'Bolton kuroljub'
		}]);
	}
}
