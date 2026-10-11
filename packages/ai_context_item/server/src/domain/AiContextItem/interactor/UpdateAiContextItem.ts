import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SaveAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/interactor/dto/SaveAiContextItemDTO';
import {SaveAiContextItemRepo} from '@copor/ai_context_item/domain/AiContextItem/repository/SaveAiContextItemRepo';

export class UpdateAiContextItem extends ExecuteUseCase<SaveAiContextItemDTO, SaveAiContextItemRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}