import {GetChecklistItemListRepo} from '@copor/checklist/domain/ChecklistItem/repository/GetChecklistItemListRepo';
import {GetChecklistItemDTO} from '@copor/checklist/domain/ChecklistItem/interactor/dto/GetChecklistItemDTO';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyGetChecklistItemListInteractorRepo implements GetChecklistItemListRepo {
	async list(checklistId: string): Promise<GetChecklistItemDTO[]> {
		const items = await db
			.selectFrom('checklistItem')
			.select(['id', 'checklistId', 'description', 'isChecked'])
			.where('checklistId', '=', checklistId)
			.execute();

		return items;
	}
}