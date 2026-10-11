import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateImage} from '@copor/core/domain/Components/Image/validation/validator/ValidateImage';
import {ValidateCanUpdateImage} from '@copor/core/domain/Components/Image/validation/validator/ValidateCanUpdateImage';
import {ValidateUpdateImageRepo} from '@copor/core/domain/Components/Image/repository/ValidateUpdateImageRepo';
import {ValidateUpdateImageDTO} from '@copor/core/domain/Components/Image/validation/dto/ValidateUpdateImageDTO';

export class ValidateUpdateImage extends ValidationWithPermissionAndRepo<ValidateUpdateImageDTO, ValidateUpdateImageRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanUpdateImage(this.permissionRepo, this.input.actorId),
			new ValidateImage(this.storageRepo, this.input.id)
		];
	}
}