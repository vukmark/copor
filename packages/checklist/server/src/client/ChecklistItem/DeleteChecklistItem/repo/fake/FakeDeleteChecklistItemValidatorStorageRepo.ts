import {ValidateDeleteChecklistItemRepo} from '@copor/checklist/domain/ChecklistItem/repository/ValidateDeleteChecklistItemRepo';

export class FakeDeleteChecklistItemValidatorStorageRepo implements ValidateDeleteChecklistItemRepo {
	isInvalidChecklistItem(checklistItemId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}

	entityHasReferences(value: string): Promise<{tableName: string} | false> {
		return Promise.resolve(false);
	}
}