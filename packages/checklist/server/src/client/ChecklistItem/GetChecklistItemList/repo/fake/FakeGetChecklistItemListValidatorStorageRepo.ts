import {ValidateGetChecklistItemListRepo} from '@copor/checklist/domain/ChecklistItem/repository/ValidateGetChecklistItemListRepo';

export class FakeGetChecklistItemListValidatorStorageRepo implements ValidateGetChecklistItemListRepo {
	isInvalidChecklist(checklistId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}