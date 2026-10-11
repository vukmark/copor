import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {AddUserToUserGroupRepo} from '@copor/core/domain/UserGroup/repository/AddUserToUserGroupRepo';
import {AddUserToUserGroupDTO} from '@copor/core/domain/UserGroup/interactor/dto/AddUserToUserGroupDTO';

export class AddUserToUserGroup extends ExecuteUseCase<AddUserToUserGroupDTO, AddUserToUserGroupRepo, void> {
	public execute(): Promise<void> {
		return this.repository.add(this.input.userId, this.input.userGroupId);
	}
}