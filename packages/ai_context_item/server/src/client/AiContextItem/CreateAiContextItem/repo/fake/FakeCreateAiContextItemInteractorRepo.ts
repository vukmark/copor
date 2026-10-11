import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/interactor/dto/SaveAiContextItemDTO';
import {UniqueIdGenerator} from '@copor/core/domain/Core/Repository/UniqueIdGenerator';

export class FakeCreateAiContextItemInteractorRepo
implements SaveItem<SaveAiContextItemDTO>, UniqueIdGenerator {
	getNewId(): Promise<string> {
		return Promise.resolve('unique-id');
	}

	save(saveDTO: SaveAiContextItemDTO): Promise<void> {
		return Promise.resolve();
	}
}