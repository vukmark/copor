import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {GetMessageDTO} from './dto/GetMessageDTO';
import {GetMessageListRepo} from '../repository/GetMessageListRepo';
import {GetMessageInputDTO} from './dto/GetMessageInputDTO';

export class GetMessageList extends ExecuteUseCase<GetMessageInputDTO, GetMessageListRepo, GetMessageDTO[]> {
	public execute(): Promise<GetMessageDTO[]> {
		return this.repository.list(this.input.chatId, this.input.beforeDate, this.input.afterDate, this.input.actorId);
	}
}
