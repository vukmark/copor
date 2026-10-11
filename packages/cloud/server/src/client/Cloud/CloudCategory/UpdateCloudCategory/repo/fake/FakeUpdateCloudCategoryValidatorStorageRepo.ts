import {
    ValidateUpdateCloudCategoryRepo
} from '@copor/cloud/domain/Cloud/CloudCategory/repository/ValidateUpdateCloudCategoryRepo';


export class FakeUpdateCloudCategoryValidatorStorageRepo implements ValidateUpdateCloudCategoryRepo {
	isInvalidCloudCategory(cloudCategoryId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
