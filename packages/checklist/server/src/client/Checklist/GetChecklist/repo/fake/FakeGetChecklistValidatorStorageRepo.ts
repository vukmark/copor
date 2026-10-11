import {ValidateGetChecklistRepo} from '@copor/checklist/domain/Checklist/repository/ValidateGetChecklistRepo';

export class FakeGetChecklistValidatorStorageRepo implements ValidateGetChecklistRepo {
	isInvalidChecklist(checklistId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
