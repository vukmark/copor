import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {ToDoPermission} from '@copor/todo/domain/ToDo/ToDoPermission';
import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';

export interface ValidateCanDeletePrivateToDoContext {
	toDoId: string;
}

export class ValidateCanDeletePrivateToDo extends PermissionValidator<ValidateCanDeletePrivateToDoContext> {
	public getPermissionType(): PermissionType {
		return ToDoPermission.canDeletePrivateToDo;
	}
}