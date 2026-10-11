import {SaveChecklistRepo} from '@copor/checklist/domain/Checklist/repository/SaveChecklistRepo';
import {SaveChecklistDTO} from '@copor/checklist/domain/Checklist/interactor/dto/SaveChecklistDTO';

export class FakeCreateChecklistInteractorRepo implements SaveChecklistRepo {
	save(saveDTO: SaveChecklistDTO): Promise<void> {
		return Promise.resolve();
	}
}