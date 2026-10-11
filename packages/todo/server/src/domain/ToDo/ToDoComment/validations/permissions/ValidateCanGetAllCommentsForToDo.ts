import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {ToDoPermission} from '@copor/todo/domain/ToDo/ToDoPermission';

export class ValidateCanGetAllCommentsForToDo extends PermissionValidator {
	public getPermissionType(): PermissionType {
		return ToDoPermission.canGetAllCommentsForToDo;
	}
}
