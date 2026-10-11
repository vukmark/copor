import {ValidateUpdateChecklistItemRepo} from '@copor/checklist/domain/ChecklistItem/repository/ValidateUpdateChecklistItemRepo';


export class FakeUpdateChecklistItemValidatorStorageRepo implements ValidateUpdateChecklistItemRepo {
	isInvalidChecklistItem(checklistItemId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}

	isInvalidChecklist(checklistId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
