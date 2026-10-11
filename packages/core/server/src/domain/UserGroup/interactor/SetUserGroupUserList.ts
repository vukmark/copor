import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SetUserGroupUserListRepo} from '@copor/core/domain/UserGroup/repository/SetUserGroupUserListRepo';
import {SetUserGroupUserListDTO} from '@copor/core/domain/UserGroup/interactor/dto/SetUserGroupUserListDTO';

export class SetUserGroupUserList extends ExecuteUseCase<SetUserGroupUserListDTO, SetUserGroupUserListRepo, void> {
	public execute(): Promise<void> {
		return this.repository.set(this.input.userGroupId, this.input.userList);
	}
}