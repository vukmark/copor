import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateGetImageDTO} from '@copor/core/domain/Components/Image/validation/dto/ValidateGetImageDTO';
import {ValidateGetImageRepo} from '@copor/core/domain/Components/Image/repository/ValidateGetImageRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateImage} from '@copor/core/domain/Components/Image/validation/validator/ValidateImage';

import {ValidateCanGetImage} from '@copor/core/domain/Components/Image/validation/validator/ValidateCanGetImage';

export class ValidateGetImage extends ValidationWithPermissionAndRepo<ValidateGetImageDTO, ValidateGetImageRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateImage(this.storageRepo, this.input.id),
			new ValidateCanGetImage(this.permissionRepo, this.input.actorId)
		];
	}
}