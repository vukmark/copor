import {ValidateGetImageRepo} from '@copor/core/domain/Components/Image/repository/ValidateGetImageRepo';
import {ImageKyselyHelper} from '@copor/core/client/Components/Image/repositoryHelper/ImageKyselyHelper';

export class KyselyGetImageValidatorStorageRepo implements ValidateGetImageRepo {
	public isInvalidImage(imageId: string): Promise<boolean> {
		return ImageKyselyHelper.isInvalidImage(imageId);
	}
}