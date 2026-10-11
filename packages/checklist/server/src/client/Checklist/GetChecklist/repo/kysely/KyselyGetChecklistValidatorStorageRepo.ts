import {ValidateGetChecklistRepo} from '@copor/checklist/domain/Checklist/repository/ValidateGetChecklistRepo';
import {ChecklistKyselyHelper} from '@copor/checklist/client/Checklist/repositoryHelper/ChecklistKyselyHelper';

export class KyselyGetChecklistValidatorStorageRepo implements ValidateGetChecklistRepo {
	isInvalidChecklist(id: string | undefined): Promise<boolean> {
		return ChecklistKyselyHelper.isInvalidChecklist(id);
	}
}