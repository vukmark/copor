import {ValidateCanCreatePublicTag} from './permissions/ValidateCanCreatePublicTag';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateEmptyName} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyName';
import {ValidateCreateTagDTO} from './dto/ValidateCreateTagDTO';

export class ValidateCreatePublicTag extends ValidationWithPermission<ValidateCreateTagDTO> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanCreatePublicTag(this.permissionRepo, this.input.actorId),
			new ValidateEmptyName(this.input.name)
		];
	}
}
