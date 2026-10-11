import {
	SearchMessagesInChatRepo
} from '@copor/vu_meet/domain/VuMeet/Message/repository/SearchMessagesInChatRepo';

import {
	SearchMessagesInChatDTO
} from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/SearchMessagesInChatDTO';

export class FakeSearchMessagesInChatInteractorRepo implements SearchMessagesInChatRepo {
	search(prompt: string, chatId: string): Promise<SearchMessagesInChatDTO[]> {
		return new Promise((resolve) => {
			resolve([]);
		});
	}
}
