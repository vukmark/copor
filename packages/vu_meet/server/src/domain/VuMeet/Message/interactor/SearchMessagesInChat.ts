import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SearchMessagesInChatRepo} from '../repository/SearchMessagesInChatRepo';
import {SearchMessagesInChatInputDTO} from './dto/SearchMessagesInChatInputDTO';

import {
	SearchMessagesInChatDTO
} from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/SearchMessagesInChatDTO';

export class SearchMessagesInChat extends ExecuteUseCase<SearchMessagesInChatInputDTO, SearchMessagesInChatRepo, SearchMessagesInChatDTO[]> {
	public execute(): Promise<SearchMessagesInChatDTO[]> {
		return this.repository.search(this.input.prompt, this.input.chatId);
	}
}
