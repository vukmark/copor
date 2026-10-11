import {ValidateCanEmptyTrash} from './permissions/ValidateCanEmptyTrash';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateToDoDTO} from './dto/ValidateToDoDTO';

export class ValidateEmptyTrash extends ValidationWithPermission<ValidateToDoDTO> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanEmptyTrash(this.permissionRepo, this.input.actorUserId)
		];
	}
}