import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {GetUserChatListRepo} from '../repository/GetUserChatListRepo';
import {GetUserChatDTO} from './dto/GetUserChatDTO';
import {GetUserChatListInputDTO} from '@copor/vu_meet/domain/VuMeet/Core/interactor/dto/GetUserChatListInputDTO';

export class GetUserChatList extends ExecuteUseCase<GetUserChatListInputDTO, GetUserChatListRepo, GetUserChatDTO[]> {
	public execute(): Promise<GetUserChatDTO[]> {
		return this.repository.list(this.input.userId, this.input.prompt);
	}
}
