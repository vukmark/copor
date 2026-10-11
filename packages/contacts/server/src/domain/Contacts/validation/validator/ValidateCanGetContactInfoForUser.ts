import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {ContactsPermission} from '@copor/contacts/domain/Contacts/ContactsPermission';

export interface ValidateCanGetContactInfoForUserContext {
	userId: string;
}

export class ValidateCanGetContactInfoForUser extends PermissionValidator<ValidateCanGetContactInfoForUserContext> {
	public getPermissionType(): PermissionType {
		return ContactsPermission.canGetContactById;
	}
}