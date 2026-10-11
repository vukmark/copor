import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {
    ValidateCanGetAllCommentsForToDo
} from '@copor/todo/domain/ToDo/ToDoComment/validations/permissions/ValidateCanGetAllCommentsForToDo';

export class ValidateGetAllCommentsForToDo extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetAllCommentsForToDo(this.permissionRepo, this.input)
		];
	}
}
