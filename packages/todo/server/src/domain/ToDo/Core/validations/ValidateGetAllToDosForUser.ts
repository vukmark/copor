import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';

import {ValidateCanGetAllToDosForUser} from '@copor/todo/domain/ToDo/Core/validations/ValidateCanGetAllToDosForUser';

export class ValidateGetAllToDosForUser extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [new ValidateCanGetAllToDosForUser(this.permissionRepo, this.input)];
	}
}
