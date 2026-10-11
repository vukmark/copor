import {ValidateDeleteCloudCategoryRepo}
	from '@copor/cloud/domain/Cloud/CloudCategory/repository/ValidateDeleteCloudCategoryRepo';
import {CloudCategoryKyselyHelper} from '@copor/cloud/client/Cloud/CloudCategory/repositoryHelper/CloudCategoryKyselyHelper';

export class KyselyDeleteCloudCategoryValidatorStorageRepo implements ValidateDeleteCloudCategoryRepo {
	isInvalidCloudCategory(id: string | undefined): Promise<boolean> {
		return CloudCategoryKyselyHelper.isInvalidCloudCategory(id);
	}

	entityHasReferences(id: string): Promise<{tableName: string} | false> {
		return CloudCategoryKyselyHelper.cloudCategoryHasReferences(id);
	}
}