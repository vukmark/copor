import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SaveUserProfileImageDTO} from '@copor/core/domain/User/interactor/dto/SaveUserProfileImageDTO';
import {SaveUserProfileImageRepo} from '@copor/core/domain/User/repository/SaveUserProfileImageRepo';

export class UpdateUserProfileImage extends ExecuteUseCase<SaveUserProfileImageDTO, SaveUserProfileImageRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input.userId, this.input.image, this.input.newImageId);
	}
}
