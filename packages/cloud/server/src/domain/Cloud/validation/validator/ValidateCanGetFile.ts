import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {CloudPermission} from '@copor/cloud/domain/Cloud/CloudPermission';
import {ValidateGetFileContext} from '@copor/cloud/domain/Cloud/validation/ValidateGetFile';

export class ValidateCanGetFile extends PermissionValidator<ValidateGetFileContext> {
	public getPermissionType(): PermissionType {
		return CloudPermission.canGetFile;
	}
}
