import {ValidateUpdateCloudCategoryRepo}
	from '@copor/cloud/domain/Cloud/CloudCategory/repository/ValidateUpdateCloudCategoryRepo';
import {CloudCategoryKyselyHelper} from '@copor/cloud/client/Cloud/CloudCategory/repositoryHelper/CloudCategoryKyselyHelper';

export class KyselyUpdateCloudCategoryValidatorStorageRepo implements ValidateUpdateCloudCategoryRepo {
	isInvalidCloudCategory(cloudCategoryId: string | undefined): Promise<boolean> {
		return CloudCategoryKyselyHelper.isInvalidCloudCategory(cloudCategoryId);
	}
}
