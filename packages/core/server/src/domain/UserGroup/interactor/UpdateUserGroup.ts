import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {UpdateUserGroupRepo} from '@copor/core/domain/UserGroup/repository/UpdateUserGroupRepo';
import {UpdateUserGroupDTO} from '@copor/core/domain/UserGroup/interactor/dto/UpdateUserGroupDTO';

export class UpdateUserGroup extends ExecuteUseCase<UpdateUserGroupDTO, UpdateUserGroupRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}
