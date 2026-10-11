import {PermissionValidator} from './PermissionValidator';
import {PermissionType} from '../../Permission/PermissionType';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';

export interface ValidateCanGetPrivateTagListForUserContext {
	userId: string;
}

export class ValidateCanGetPrivateTagListForUser extends PermissionValidator<ValidateCanGetPrivateTagListForUserContext> {
	public getPermissionType(): PermissionType {
		return CorePermission.canGetPrivateTagListForUser;
	}
}
