import {ValidateDeleteChecklistItemRepo} from '@copor/checklist/domain/ChecklistItem/repository/ValidateDeleteChecklistItemRepo';
import {ChecklistItemKyselyHelper} from '@copor/checklist/client/ChecklistItem/repositoryHelper/ChecklistItemKyselyHelper';

export class KyselyDeleteChecklistItemValidatorStorageRepo implements ValidateDeleteChecklistItemRepo {
	isInvalidChecklistItem(id: string | undefined): Promise<boolean> {
		return ChecklistItemKyselyHelper.isInvalidChecklistItem(id);
	}
	entityHasReferences(id: string): Promise<{tableName: string} | false> {
		return ChecklistItemKyselyHelper.checklistItemHasReferences(id);
	}
}
