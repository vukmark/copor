import {ValidateCreateChecklistItemRepo} from '@copor/checklist/domain/ChecklistItem/repository/ValidateCreateChecklistItemRepo';
import {ChecklistKyselyHelper} from '@copor/checklist/client/Checklist/repositoryHelper/ChecklistKyselyHelper';

export class KyselyCreateChecklistItemValidatorStorageRepo implements ValidateCreateChecklistItemRepo {
	isInvalidChecklist(id: string | undefined): Promise<boolean> {
		return ChecklistKyselyHelper.isInvalidChecklist(id);
	}
}