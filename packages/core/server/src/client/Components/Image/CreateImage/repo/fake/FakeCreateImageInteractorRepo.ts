import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveImageDTO} from '@copor/core/domain/Components/Image/interactor/dto/SaveImageDTO';

export class FakeCreateImageInteractorRepo implements SaveItem<SaveImageDTO> {
	save(saveDTO: SaveImageDTO): Promise<void> {
		return Promise.resolve();
	}
}
