import {db} from '@copor/core/client/AppDataSource';
import {SaveChecklistItemRepo} from '@copor/checklist/domain/ChecklistItem/repository/SaveChecklistItemRepo';
import {SaveChecklistItemDTO} from '@copor/checklist/domain/Checklist/interactor/dto/SaveChecklistItemDTO';

export class KyselyCreateChecklistItemInteractorRepo implements SaveChecklistItemRepo {
	async save(saveDTO: SaveChecklistItemDTO): Promise<void> {
		await db
			.insertInto('checklistItem')
			.values({
				id: saveDTO.id,
				checklistId: saveDTO.checklistId,
				description: saveDTO.description,
				isChecked: saveDTO.isChecked
			})
			.execute();
	}
}
