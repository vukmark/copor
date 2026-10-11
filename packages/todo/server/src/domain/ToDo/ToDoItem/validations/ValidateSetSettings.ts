import {ValidateCanSetSettings} from './permissions/ValidateCanSetSettings';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateToDoDTO} from './dto/ValidateToDoDTO';

export class ValidateSetSettings extends ValidationWithPermission<ValidateToDoDTO> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanSetSettings(this.permissionRepo, this.input.actorUserId)
		];
	}
}