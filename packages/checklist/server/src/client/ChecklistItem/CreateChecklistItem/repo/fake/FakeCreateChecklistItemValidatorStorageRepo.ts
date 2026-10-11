import {ValidateCreateChecklistItemRepo} from '@copor/checklist/domain/ChecklistItem/repository/ValidateCreateChecklistItemRepo';

export class FakeCreateChecklistItemValidatorStorageRepo implements ValidateCreateChecklistItemRepo {
	isInvalidChecklist(checklistId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}