import {PermissionValidator} from './PermissionValidator';
import {PermissionType} from '../../Permission/PermissionType';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';

export class ValidateCanGetUserPermissionList extends PermissionValidator {
	public getPermissionType(): PermissionType {
		return CorePermission.canGetUserPermissionList;
	}
}
