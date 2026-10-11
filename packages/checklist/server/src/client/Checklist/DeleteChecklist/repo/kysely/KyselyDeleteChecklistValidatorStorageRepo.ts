import {ValidateDeleteChecklistRepo} from '@copor/checklist/domain/Checklist/repository/ValidateDeleteChecklistRepo';
import {ChecklistKyselyHelper} from '@copor/checklist/client/Checklist/repositoryHelper/ChecklistKyselyHelper';

export class KyselyDeleteChecklistValidatorStorageRepo implements ValidateDeleteChecklistRepo {
	isInvalidChecklist(id: string | undefined): Promise<boolean> {
		return ChecklistKyselyHelper.isInvalidChecklist(id);
	}

	entityHasReferences(id: string): Promise<{tableName: string} | false> {
		return ChecklistKyselyHelper.checklistHasReferences(id);
	}
}