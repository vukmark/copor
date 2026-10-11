import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {CloudPermission} from '@copor/cloud/domain/Cloud/CloudPermission';

export class ValidateCanUpdateCloudCategory extends PermissionValidator {
	public getPermissionType(): PermissionType {
		return CloudPermission.canUpdateCloudCategory;
	}
}