import {
	ValidateUpdateChecklistRepo
} from '@copor/checklist/domain/Checklist/repository/ValidateUpdateChecklistRepo';

export class FakeUpdateChecklistValidatorStorageRepo implements ValidateUpdateChecklistRepo {
	isInvalidChecklist(checklistId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
