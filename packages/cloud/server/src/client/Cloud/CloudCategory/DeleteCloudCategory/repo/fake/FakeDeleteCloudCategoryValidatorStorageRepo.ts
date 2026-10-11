import {ValidateDeleteCloudCategoryRepo}
	from '@copor/cloud/domain/Cloud/CloudCategory/repository/ValidateDeleteCloudCategoryRepo';

export class FakeDeleteCloudCategoryValidatorStorageRepo implements ValidateDeleteCloudCategoryRepo {
	isInvalidCloudCategory(cloudCategoryId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}

	entityHasReferences(value: string): Promise<{tableName: string} | false> {
		return Promise.resolve(false);
	}
}