import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SaveUserDTO} from '@copor/core/domain/User/interactor/dto/SaveUserDTO';
import {UpdateUserRepo} from '@copor/core/domain/User/repository/UpdateUserRepo';

export class UpdateUser extends ExecuteUseCase<SaveUserDTO, UpdateUserRepo, void> {
	public async execute(): Promise<void> {
		return this.repository.update(this.input);
	}
}