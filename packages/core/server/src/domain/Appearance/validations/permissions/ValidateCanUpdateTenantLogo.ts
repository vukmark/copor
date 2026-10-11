import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';
import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';

export class ValidateCanUpdateTenantLogo extends PermissionValidator {
	public getPermissionType(): PermissionType {
		return CorePermission.canUpdateTenantLogo;
	}
}