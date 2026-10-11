import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';

export interface ValidateCanUpdateUserLoginInformationContext {
	userId: string;
}

export class ValidateCanUpdateUserLoginInformation extends PermissionValidator<ValidateCanUpdateUserLoginInformationContext> {
	public getPermissionType(): PermissionType {
		return CorePermission.canUpdateUserLoginInformation;
	}
}