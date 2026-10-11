import {ValidateCanDeletePrivateToDo, ValidateCanDeletePrivateToDoContext} from './validator/ValidateCanDeletePrivateToDo';
import {IsInvalidToDoRepo} from '../../ToDoItem/repository/IsInvalidToDoRepo';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateTodoItem} from '@copor/todo/domain/ToDo/ToDoItem/validations/ValidateTodoItem';
import {ValidateDeletePrivateToDoDTO} from './dto/ValidateDeletePrivateToDoDTO';

export class ValidateDeletePrivateToDo extends ValidationWithPermissionAndRepo<
	ValidateDeletePrivateToDoDTO,
	IsInvalidToDoRepo,
	ValidateCanDeletePrivateToDoContext> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanDeletePrivateToDo(this.permissionRepo, this.input.actorId, {toDoId: this.input.toDoId}),
			new ValidateTodoItem(this.storageRepo, this.input.toDoId)
		];
	}
}
