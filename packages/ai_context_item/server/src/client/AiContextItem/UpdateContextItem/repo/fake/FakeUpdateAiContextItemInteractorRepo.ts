import {SaveAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/interactor/dto/SaveAiContextItemDTO';
import {SaveAiContextItemRepo} from '@copor/ai_context_item/domain/AiContextItem/repository/SaveAiContextItemRepo';

export class FakeUpdateAiContextItemInteractorRepo implements SaveAiContextItemRepo {
	save(saveDTO: SaveAiContextItemDTO): Promise<void> {
		return Promise.resolve(undefined);
	}
}