import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveQueuedEmailDTO} from '@copor/core/domain/Core/EmailOutbox/interactor/dto/SaveQueuedEmailDTO';

export class FakeCreateQueuedEmailInteractorRepo implements SaveItem<SaveQueuedEmailDTO> {
	save(saveDTO: SaveQueuedEmailDTO): Promise<void> {
		return Promise.resolve();
	}
}
