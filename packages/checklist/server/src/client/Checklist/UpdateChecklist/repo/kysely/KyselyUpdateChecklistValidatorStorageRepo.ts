import {ValidateUpdateChecklistRepo} from '@copor/checklist/domain/Checklist/repository/ValidateUpdateChecklistRepo';
import {ChecklistKyselyHelper} from '@copor/checklist/client/Checklist/repositoryHelper/ChecklistKyselyHelper';

export class KyselyUpdateChecklistValidatorStorageRepo implements ValidateUpdateChecklistRepo {
	isInvalidChecklist(id: string | undefined): Promise<boolean> {
		return ChecklistKyselyHelper.isInvalidChecklist(id);
	}
}