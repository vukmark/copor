import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {NewsPermission} from '@copor/news/domain/News/NewsPermission';

export class ValidateCanGetNews extends PermissionValidator {
	public getPermissionType(): PermissionType {
		return NewsPermission.canGetNews;
	}
}