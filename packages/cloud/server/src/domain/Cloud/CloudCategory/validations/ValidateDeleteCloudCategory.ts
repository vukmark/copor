import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCloudCategory} from '@copor/cloud/domain/Cloud/CloudCategory/validations/ValidateCloudCategory';
import {ValidateCanDeleteCloudCategory} from './permissions/ValidateCanDeleteCloudCategory';
import {ValidateDeleteCloudCategoryDTO} from './dto/ValidateDeleteCloudCategoryDTO';
import {ValidateDeleteCloudCategoryRepo} from '../repository/ValidateDeleteCloudCategoryRepo';
import {ValidateEntityIsNotReferenced} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export class ValidateDeleteCloudCategory
	extends ValidationWithPermissionAndRepo<ValidateDeleteCloudCategoryDTO, ValidateDeleteCloudCategoryRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanDeleteCloudCategory(this.permissionRepo, this.input.actorId),
			new ValidateCloudCategory(this.storageRepo, this.input.cloudCategoryId),
			new ValidateEntityIsNotReferenced(this.storageRepo, this.input.cloudCategoryId)
		];
	}
}
