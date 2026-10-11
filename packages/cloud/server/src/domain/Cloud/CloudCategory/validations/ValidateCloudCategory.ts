import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {InvalidIDException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidIDException';
import {IsInvalidCloudCategoryRepo} from '@copor/cloud/domain/Cloud/CloudCategory/repository/IsInvalidCloudCategoryRepo';
import {InvalidCloudCategoryException} from '@copor/cloud/domain/Cloud/CloudCategory/exception/InvalidCloudCategoryException';

export class ValidateCloudCategory extends ValidatorWithRepo<IsInvalidCloudCategoryRepo, string> {
	public async validate(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			if (!this.input) {
				reject(new InvalidIDException());
			}
			this.repository.isInvalidCloudCategory(this.input).then((isInvalidCloudCategory) => {
				if (isInvalidCloudCategory) {
					throw new InvalidCloudCategoryException();
				}
				resolve();
			}).catch((error: Error) => {
				reject(error);
			});
		});
	}
}
