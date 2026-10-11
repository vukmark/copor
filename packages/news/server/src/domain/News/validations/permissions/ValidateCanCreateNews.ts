import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {NewsPermission} from '@copor/news/domain/News/NewsPermission';

export interface ValidateCanCreateNewsContext {
	newsId: string;
}

export class ValidateCanCreateNews extends PermissionValidator<ValidateCanCreateNewsContext> {
	public getPermissionType(): PermissionType {
		return NewsPermission.canCreateNews;
	}
}