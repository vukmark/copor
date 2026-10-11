import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';

export interface ValidateCanUpdatePersonalAccountInformationContext{
	userId: string;
}

export class ValidateCanUpdatePersonalAccountInformation extends PermissionValidator<ValidateCanUpdatePersonalAccountInformationContext> {
	public getPermissionType(): PermissionType {
		return CorePermission.canUpdatePersonalAccountInformation;
	}
}