import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {GetChatWithUserInputDTO} from './dto/GetChatWithUserInputDTO';
import {GetChatWithUserRepo} from '../repository/GetChatWithUserRepo';

export class GetChatWithUser extends
	ExecuteUseCase<GetChatWithUserInputDTO, GetChatWithUserRepo, string> {
	public execute(): Promise<string> {
		return this.repository.load(this.input.actorId, this.input.users, this.input.uniqueId, this.input.groupName);
	}
}
