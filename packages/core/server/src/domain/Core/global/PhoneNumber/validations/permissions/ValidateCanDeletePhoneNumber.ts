import {PermissionValidator} from '../../../../Validations/Validators/PermissionValidator';
import {PermissionType} from '../../../../Permission/PermissionType';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';

export class ValidateCanDeletePhoneNumber extends PermissionValidator {
	public getPermissionType(): PermissionType {
		return CorePermission.canDeletePhoneNumber;
	}
}
