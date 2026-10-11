import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {ValidateCreateTagDTO} from './dto/ValidateCreateTagDTO';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateEmptyName} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyName';
import {ValidateCanCreatePrivateTag} from './permissions/ValidateCanCreatePrivateTag';

export class ValidateCreatePrivateTag extends ValidationWithPermission<ValidateCreateTagDTO> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanCreatePrivateTag(this.permissionRepo, this.input.actorId),
			new ValidateEmptyName(this.input.name)
		];
	}
}