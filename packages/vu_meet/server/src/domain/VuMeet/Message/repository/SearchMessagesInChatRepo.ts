import {
	SearchMessagesInChatDTO
} from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/SearchMessagesInChatDTO';

export interface SearchMessagesInChatRepo {
	search(prompt: string, chatId: string): Promise<SearchMessagesInChatDTO[]>;
}
