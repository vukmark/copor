import {ValidateGetImageRepo} from '@copor/core/domain/Components/Image/repository/ValidateGetImageRepo';

export class FakeGetImageValidatorStorageRepo implements ValidateGetImageRepo {
	isInvalidImage(imageId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
