import {PermissionType} from '../../../../Core/Permission/PermissionType';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';
import {PermissionValidator} from '../../../../Core/Validations/Validators/PermissionValidator';

export class ValidateCanDeleteRole extends PermissionValidator {
	public getPermissionType(): PermissionType {
		return CorePermission.canDeleteRole;
	}
}
