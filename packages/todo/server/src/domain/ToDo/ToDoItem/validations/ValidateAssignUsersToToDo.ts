import {AssignUsersToToDoDTO} from '../interactor/dto/AssignUsersToToDoDTO';
import {ValidateCanAssignUsersToToDo} from './permissions/ValidateCanAssignUsersToToDo';
import {ValidateAssignUsersToToDoRepo} from '../repository/ValidateAssignUsersToToDoRepo';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateTodoItem} from '@copor/todo/domain/ToDo/ToDoItem/validations/ValidateTodoItem';
import {ValidateListOfIds} from '@copor/core/domain/Core/Validations/Validators/ValidateListOfIds';
import {ValidateUserList} from '@copor/todo/domain/ToDo/ToDoItem/validations/validator/ValidateUserList';


export class ValidateAssignUsersToToDo extends ValidationWithPermissionAndRepo<AssignUsersToToDoDTO, ValidateAssignUsersToToDoRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanAssignUsersToToDo(this.permissionRepo, this.input.actorId),
			new ValidateTodoItem(this.storageRepo, this.input.todoId),
			new ValidateListOfIds(this.input.userIds),
			new ValidateUserList(this.storageRepo, this.input.userIds)
		];
	}
}
