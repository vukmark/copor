import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {ContentItemPermission} from '@copor/core/domain/ContentItem/ContentItemPermission';

export class ValidateCanDeleteContentItem extends PermissionValidator {
	public getPermissionType(): PermissionType {
		return ContentItemPermission.canDeleteContentItem;
	}
}