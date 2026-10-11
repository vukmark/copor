import {ValidateDeleteChecklistRepo} from '@copor/checklist/domain/Checklist/repository/ValidateDeleteChecklistRepo';

export class FakeDeleteChecklistValidatorStorageRepo implements ValidateDeleteChecklistRepo {
	isInvalidChecklist(): Promise<boolean> {
		return Promise.resolve(false);
	}

	entityHasReferences(value: string): Promise<{tableName: string} | false> {
		return Promise.resolve(false);
	}
}