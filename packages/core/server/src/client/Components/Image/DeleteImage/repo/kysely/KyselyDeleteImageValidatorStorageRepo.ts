import {ValidateDeleteImageRepo}
	from '@copor/core/domain/Components/Image/repository/ValidateDeleteImageRepo';
import {ImageKyselyHelper} from '@copor/core/client/Components/Image/repositoryHelper/ImageKyselyHelper';

export class KyselyDeleteImageValidatorStorageRepo implements ValidateDeleteImageRepo {
	isInvalidImage(imageId: string): Promise<boolean> {
		return ImageKyselyHelper.isInvalidImage(imageId);
	}
}