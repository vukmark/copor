import {PermissionValidator} from './PermissionValidator';
import {PermissionType} from '../../Permission/PermissionType';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';

export interface ValidateCanUpdateUserAccountInformationContext {
	userId: string;
}

export class ValidateCanUpdateUserAccountInformation
	extends PermissionValidator<ValidateCanUpdateUserAccountInformationContext> {
	public getPermissionType(): PermissionType {
		return CorePermission.canUpdateUserAccountInformation;
	}
}
