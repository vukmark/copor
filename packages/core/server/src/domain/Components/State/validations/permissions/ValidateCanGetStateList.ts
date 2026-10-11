import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';

export class ValidateCanGetStateList extends PermissionValidator {
	public getPermissionType(): PermissionType {
		return CorePermission.canGetStateList;
	}
}