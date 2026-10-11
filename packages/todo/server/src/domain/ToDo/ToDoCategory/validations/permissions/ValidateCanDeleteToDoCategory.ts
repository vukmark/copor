import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {ToDoPermission} from '@copor/todo/domain/ToDo/ToDoPermission';

export class ValidateCanDeleteToDoCategory extends PermissionValidator {
	public getPermissionType(): PermissionType {
		return ToDoPermission.canDeleteToDoCategory;
	}
}
