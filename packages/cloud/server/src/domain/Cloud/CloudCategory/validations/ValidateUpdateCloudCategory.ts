import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {SaveCloudCategoryDTO} from '../interactor/dto/SaveCloudCategoryDTO';
import {ValidateUpdateCloudCategoryRepo} from '../repository/ValidateUpdateCloudCategoryRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanUpdateCloudCategory} from './permissions/ValidateCanUpdateCloudCategory';
import {ValidateEmptyName} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyName';
import {ValidateCloudCategory} from '@copor/cloud/domain/Cloud/CloudCategory/validations/ValidateCloudCategory';

export class ValidateUpdateCloudCategory extends ValidationWithPermissionAndRepo<SaveCloudCategoryDTO, ValidateUpdateCloudCategoryRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanUpdateCloudCategory(this.permissionRepo, this.input.actorId),
			new ValidateEmptyName(this.input.name),
			new ValidateCloudCategory(this.storageRepo, this.input.id)
		];
	}
}