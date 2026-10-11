import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';
import {
	ValidateCanUpdateUserAccountInformationContext
} from '@copor/core/domain/Core/Validations/Validators/ValidateCanUpdateUserAccountInformation';

export class ValidateCanUpdateUserProfileImage
	extends PermissionValidator<ValidateCanUpdateUserAccountInformationContext> {
	public getPermissionType(): PermissionType {
		return CorePermission.canUpdateUserAccountInformation;
	}
}
