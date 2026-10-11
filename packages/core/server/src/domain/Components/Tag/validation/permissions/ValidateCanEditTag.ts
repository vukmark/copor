import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';

export interface ValidateCanEditTagContext {
	tagId: string;
}

export class ValidateCanEditTag extends PermissionValidator <ValidateCanEditTagContext> {
	public getPermissionType(): PermissionType {
		return CorePermission.canEditTag;
	}
}
