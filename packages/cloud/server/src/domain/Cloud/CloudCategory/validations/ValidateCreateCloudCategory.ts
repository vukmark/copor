import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateEmptyName} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyName';
import {ValidateCanCreateCloudCategory} from './permissions/ValidateCanCreateCloudCategory';
import {ValidateCreateCloudCategoryDTO}
	from '@copor/cloud/domain/Cloud/CloudCategory/validations/dto/ValidateCreateCloudCategoryDTO';

export class ValidateCreateCloudCategory extends ValidationWithPermission<ValidateCreateCloudCategoryDTO> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanCreateCloudCategory(this.permissionRepo, this.input.actorId),
			new ValidateEmptyName(this.input.name)
		];
	}
}