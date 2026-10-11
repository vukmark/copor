import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {CloudPermission} from '@copor/cloud/domain/Cloud/CloudPermission';

export class ValidateCanGetCloudCategoryList extends PermissionValidator {
	public getPermissionType(): PermissionType {
		return CloudPermission.canGetCloudCategoryList;
	}
}