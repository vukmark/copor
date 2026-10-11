import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateUpdatePersonalProfileImageDTO} from '@copor/core/domain/User/validation/dto/ValidateUpdatePersonalProfileImageDTO';
import {ValidateCanUpdatePersonalProfileImage} from '@copor/core/domain/User/validation/validator/ValidateCanUpdatePersonalProfileImage';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';

export class ValidateUpdatePersonalProfileImage
	extends ValidationWithPermission<ValidateUpdatePersonalProfileImageDTO> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanUpdatePersonalProfileImage(this.permissionRepo, this.input.actorId)
		];
	}
}
