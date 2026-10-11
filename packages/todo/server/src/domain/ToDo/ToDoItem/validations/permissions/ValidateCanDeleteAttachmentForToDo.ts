import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {ToDoPermission} from '@copor/todo/domain/ToDo/ToDoPermission';
import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';

export class ValidateCanDeleteAttachmentForToDo extends PermissionValidator {
	public getPermissionType(): PermissionType {
		return ToDoPermission.canDeleteAttachmentForToDo;
	}
}