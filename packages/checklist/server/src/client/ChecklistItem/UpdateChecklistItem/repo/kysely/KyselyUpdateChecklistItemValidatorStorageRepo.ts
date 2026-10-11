import {ValidateUpdateChecklistItemRepo} from '@copor/checklist/domain/ChecklistItem/repository/ValidateUpdateChecklistItemRepo';
import {ChecklistItemKyselyHelper} from '@copor/checklist/client/ChecklistItem/repositoryHelper/ChecklistItemKyselyHelper';
import {ChecklistKyselyHelper} from '@copor/checklist/client/Checklist/repositoryHelper/ChecklistKyselyHelper';

export class KyselyUpdateChecklistItemValidatorStorageRepo implements ValidateUpdateChecklistItemRepo {
	isInvalidChecklist(id: string | undefined): Promise<boolean> {
		return ChecklistKyselyHelper.isInvalidChecklist(id);
	}

	isInvalidChecklistItem(id: string | undefined): Promise<boolean> {
		return ChecklistItemKyselyHelper.isInvalidChecklistItem(id);
	}
}