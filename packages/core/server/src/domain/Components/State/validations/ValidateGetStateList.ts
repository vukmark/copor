import {ValidateGetStateListDTO} from './dto/ValidateGetStateListDTO';
import {ValidateCanGetStateList} from './permissions/ValidateCanGetStateList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';

export class ValidateGetStateList
	extends ValidationWithPermission<ValidateGetStateListDTO> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetStateList(this.permissionRepo, this.input.actorId)
		];
	}
}