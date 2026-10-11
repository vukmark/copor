import {
	MarkChatMessagesSeenRepo
} from '@copor/vu_meet/domain/VuMeet/Chat/repository/MarkChatMessagesSeenRepo';

export class FakeMarkChatMessagesSeenInteractorRepo implements MarkChatMessagesSeenRepo {
	markChatMessagesRead(chatId: string, userId: string): Promise<void> {
		return Promise.resolve();
	}
}
