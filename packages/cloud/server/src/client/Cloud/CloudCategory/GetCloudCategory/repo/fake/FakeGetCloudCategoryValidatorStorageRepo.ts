import {ValidateGetCloudCategoryRepo} from '@copor/cloud/domain/Cloud/CloudCategory/repository/ValidateGetCloudCategoryRepo';

export class FakeGetCloudCategoryValidatorStorageRepo implements ValidateGetCloudCategoryRepo {
	isInvalidCloudCategory(cloudCategoryId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
