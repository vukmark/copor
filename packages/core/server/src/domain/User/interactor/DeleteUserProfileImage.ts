import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {DeleteUserProfileImageRepo} from '@copor/core/domain/User/repository/DeleteUserProfileImageRepo';

export class DeleteUserProfileImage extends ExecuteUseCase<string, DeleteUserProfileImageRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.deleteProfileImage(this.input);
	}
}
