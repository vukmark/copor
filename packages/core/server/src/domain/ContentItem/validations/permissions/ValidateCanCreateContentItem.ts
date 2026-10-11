import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {ContentItemPermission} from '@copor/core/domain/ContentItem/ContentItemPermission';

export interface ValidateCanCreateContentItemContext {
	contentItemId: string;
}

export class ValidateCanCreateContentItem extends PermissionValidator<ValidateCanCreateContentItemContext> {
	public getPermissionType(): PermissionType {
		return ContentItemPermission.canCreateContentItem;
	}
}