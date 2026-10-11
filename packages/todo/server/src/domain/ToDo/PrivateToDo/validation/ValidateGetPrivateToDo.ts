import {ValidateToDoDTO} from '../../ToDoItem/validations/dto/ValidateToDoDTO';
import {ValidateCanGetPrivateToDo, ValidateCanGetPrivateToDoContext} from './validator/ValidateCanGetPrivateToDo';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';

export class ValidateGetPrivateToDo extends ValidationWithPermission<ValidateToDoDTO, ValidateCanGetPrivateToDoContext> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetPrivateToDo(this.permissionRepo, this.input.actorUserId, {toDoId: this.input.todoId})
		];
	}
}
