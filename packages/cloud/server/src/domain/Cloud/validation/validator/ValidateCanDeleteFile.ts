import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {CloudPermission} from '@copor/cloud/domain/Cloud/CloudPermission';
import {ValidateCanDeleteFileContext} from '@copor/cloud/domain/Cloud/validation/ValidateDeleteFile';

export class ValidateCanDeleteFile extends PermissionValidator<ValidateCanDeleteFileContext> {
	public getPermissionType(): PermissionType {
		return CloudPermission.canDeleteFile;
	}
}
