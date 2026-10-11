import {ValidateCloudCategoryInputDTO} from './dto/ValidateCloudCategoryInputDTO';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanGetCloudCategory} from './permissions/ValidateCanGetCloudCategory';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateGetCloudCategoryRepo} from '../repository/ValidateGetCloudCategoryRepo';
import {ValidateCloudCategory} from '@copor/cloud/domain/Cloud/CloudCategory/validations/ValidateCloudCategory';

export class ValidateGetCloudCategory extends ValidationWithPermissionAndRepo<ValidateCloudCategoryInputDTO, ValidateGetCloudCategoryRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetCloudCategory(this.permissionRepo, this.input.actorId),
			new ValidateCloudCategory(this.storageRepo, this.input.cloudCategoryId)
		];
	}
}