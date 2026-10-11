import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';

export interface ValidateCanUpdateUserAccountInformationContext {
	userId: string;
}

export class ValidateCanUpdateUserAccountInformation extends PermissionValidator<ValidateCanUpdateUserAccountInformationContext> {
	public getPermissionType(): PermissionType {
		return CorePermission.canUpdateUserAccountInformation;
	}
}