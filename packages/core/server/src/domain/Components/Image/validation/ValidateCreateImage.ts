import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanCreateImage} from './validator/ValidateCanCreateImage';
import {ValidateCreateImageDTO} from './dto/ValidateCreateImageDTO';

export class ValidateCreateImage extends ValidationWithPermission<ValidateCreateImageDTO> {
	public getValidators(): Validator[] {
		return [new ValidateCanCreateImage(this.permissionRepo, this.input.actorId)];
	}
}