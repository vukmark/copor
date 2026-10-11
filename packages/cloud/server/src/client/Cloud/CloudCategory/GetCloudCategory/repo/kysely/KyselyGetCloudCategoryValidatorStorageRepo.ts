import {ValidateGetCloudCategoryRepo} from '@copor/cloud/domain/Cloud/CloudCategory/repository/ValidateGetCloudCategoryRepo';
import {CloudCategoryKyselyHelper} from '@copor/cloud/client/Cloud/CloudCategory/repositoryHelper/CloudCategoryKyselyHelper';

export class KyselyGetCloudCategoryValidatorStorageRepo implements ValidateGetCloudCategoryRepo {
	isInvalidCloudCategory(cloudCategoryId: string | undefined): Promise<boolean> {
		return CloudCategoryKyselyHelper.isInvalidCloudCategory(cloudCategoryId);
	}
}
