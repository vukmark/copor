import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SaveImageDTO} from '@copor/core/domain/Components/Image/interactor/dto/SaveImageDTO';
import {SaveImageRepo} from '@copor/core/domain/Components/Image/repository/SaveImageRepo';

export class UpdateImage extends ExecuteUseCase<SaveImageDTO, SaveImageRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}