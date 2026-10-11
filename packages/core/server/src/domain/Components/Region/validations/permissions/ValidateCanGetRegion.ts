import {PermissionValidator} from '../../../../Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '../../../../Core/Permission/PermissionType';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';

export class ValidateCanGetRegion extends PermissionValidator {
	public getPermissionType(): PermissionType {
		return CorePermission.canGetRegion;
	}
}