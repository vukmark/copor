import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SaveContentItemDTO} from '@copor/core/domain/ContentItem/interactor/dto/SaveContentItemDTO';
import {SaveContentItemRepo} from '@copor/core/domain/ContentItem/repository/SaveContentItemRepo';

export class UpdateContentItem extends ExecuteUseCase<SaveContentItemDTO, SaveContentItemRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}