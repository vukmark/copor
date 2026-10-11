import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {MarkChatMessagesSeenDTO} from './dto/MarkChatMessagesSeenDTO';
import {MarkChatMessagesSeenRepo} from '../repository/MarkChatMessagesSeenRepo';

export class MarkChatMessagesSeen extends ExecuteUseCase<MarkChatMessagesSeenDTO, MarkChatMessagesSeenRepo, void> {
	public execute(): Promise<void> {
		return this.repository.markChatMessagesRead(this.input.chatId, this.input.userId);
	}
}
