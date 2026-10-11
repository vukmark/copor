import {ValidateDeleteImageRepo}
	from '@copor/core/domain/Components/Image/repository/ValidateDeleteImageRepo';

export class FakeDeleteImageValidatorStorageRepo implements ValidateDeleteImageRepo {
	isInvalidImage(imageId: string): Promise<boolean> {
		return Promise.resolve(false);
	}
}