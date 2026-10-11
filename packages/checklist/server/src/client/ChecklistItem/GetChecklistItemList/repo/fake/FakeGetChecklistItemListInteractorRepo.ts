import {GetChecklistItemDTO} from '@copor/checklist/domain/ChecklistItem/interactor/dto/GetChecklistItemDTO';
import {GetChecklistItemListRepo} from '@copor/checklist/domain/ChecklistItem/repository/GetChecklistItemListRepo';

export class FakeGetChecklistItemListInteractorRepo implements GetChecklistItemListRepo {
	list(checklistId: string): Promise<GetChecklistItemDTO[]> {
		return Promise.resolve([
			{
				id: '123e4567-e89b-12d3-a456-426614174000',
				checklistId: '987e6543-e21b-43d3-b456-426614174999',
				description: 'Verify fire extinguisher pressure',
				isChecked: false
			}
		]);
	}
}
