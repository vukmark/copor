import {ValidateDeleteFileRepo} from '@copor/cloud/domain/Cloud/repository/ValidateDeleteFileRepo';

export class FakeDeleteFileValidatorStorageRepo implements ValidateDeleteFileRepo {
	isInvalidFile(): Promise<boolean> {
		return Promise.resolve(false);
	}
	entityHasReferences(value: string): Promise<{tableName: string} | false> {
		return Promise.resolve(false);
	}
}