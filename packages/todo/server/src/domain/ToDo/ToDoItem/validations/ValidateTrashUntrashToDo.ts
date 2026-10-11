import {ValidateToDoDTO} from './dto/ValidateToDoDTO';
import {ValidateTrashUntrashToDoRepo} from '../repository/ValidateTrashUntrashToDoRepo';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanTrashUntrashToDo} from './permissions/ValidateCanTrashUntrashToDo';
import {ValidateEmptyId} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyId';
import {ValidateTodoItem} from '@copor/todo/domain/ToDo/ToDoItem/validations/ValidateTodoItem';

export class ValidateTrashUntrashToDo extends ValidationWithPermissionAndRepo<ValidateToDoDTO, ValidateTrashUntrashToDoRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanTrashUntrashToDo(this.permissionRepo, this.input.actorUserId),
			new ValidateTodoItem(this.storageRepo, this.input.todoId)
		];
	}
}
