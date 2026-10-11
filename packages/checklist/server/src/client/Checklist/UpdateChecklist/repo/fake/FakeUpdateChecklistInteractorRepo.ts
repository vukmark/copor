import {SaveChecklistDTO} from '@copor/checklist/domain/Checklist/interactor/dto/SaveChecklistDTO';
import {UpdateChecklistRepo} from '@copor/checklist/domain/Checklist/repository/UpdateChecklistRepo';

export class FakeUpdateChecklistInteractorRepo implements UpdateChecklistRepo {
	update(checklistDTO: SaveChecklistDTO): Promise<void> {
		return Promise.resolve();
	}
}
