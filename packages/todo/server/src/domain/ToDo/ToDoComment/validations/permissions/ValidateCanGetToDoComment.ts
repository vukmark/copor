import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {ToDoPermission} from '@copor/todo/domain/ToDo/ToDoPermission';

export class ValidateCanGetToDoComment extends PermissionValidator {
	public getPermissionType(): PermissionType {
		return ToDoPermission.canGetToDoComment;
	}
}