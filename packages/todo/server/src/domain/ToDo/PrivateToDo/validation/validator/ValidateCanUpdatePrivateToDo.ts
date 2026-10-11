import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {ToDoPermission} from '@copor/todo/domain/ToDo/ToDoPermission';
import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';

export interface ValidateCanUpdatePrivateToDoContext {
	toDoId: string;
}

export class ValidateCanUpdatePrivateToDo extends PermissionValidator<ValidateCanUpdatePrivateToDoContext>{
	public getPermissionType(): PermissionType {
		return ToDoPermission.canUpdatePrivateToDo;
	}
}