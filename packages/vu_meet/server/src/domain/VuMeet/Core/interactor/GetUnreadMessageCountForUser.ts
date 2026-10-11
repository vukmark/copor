import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {GetUnreadMessageCountForUserRepo} from '../repository/GetUnreadMessageCountForUserRepo';
import {GetUnreadMessageCountForUserDTO} from './dto/GetUnreadMessageCountForUserDTO';

export class GetUnreadMessageCountForUser
	extends ExecuteUseCase<string, GetUnreadMessageCountForUserRepo, GetUnreadMessageCountForUserDTO> {
	public execute(): Promise<GetUnreadMessageCountForUserDTO> {
		return this.repository.getUnreadMessageCountForUser(this.input);
	}
}
