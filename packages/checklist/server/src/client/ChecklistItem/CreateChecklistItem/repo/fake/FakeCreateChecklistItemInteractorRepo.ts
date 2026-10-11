import {SaveChecklistItemRepo} from '@copor/checklist/domain/ChecklistItem/repository/SaveChecklistItemRepo';
import {SaveChecklistItemDTO} from '@copor/checklist/domain/Checklist/interactor/dto/SaveChecklistItemDTO';


export class FakeCreateChecklistItemInteractorRepo implements SaveChecklistItemRepo {
	save(saveDTO: SaveChecklistItemDTO): Promise<void> {
		return Promise.resolve();
	}
}