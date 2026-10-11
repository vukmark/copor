import {ValidateGetChecklistItemListRepo} from '@copor/checklist/domain/ChecklistItem/repository/ValidateGetChecklistItemListRepo';
import {ChecklistItemKyselyHelper} from '@copor/checklist/client/ChecklistItem/repositoryHelper/ChecklistItemKyselyHelper';

export class KyselyGetChecklistItemListValidatorStorageRepo implements ValidateGetChecklistItemListRepo {
	isInvalidChecklist(id: string | undefined): Promise<boolean> {
		return ChecklistItemKyselyHelper.isInvalidChecklistItem(id);
	}
}