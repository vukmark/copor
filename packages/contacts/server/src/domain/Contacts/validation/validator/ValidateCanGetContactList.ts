import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {ContactsPermission} from '@copor/contacts/domain/Contacts/ContactsPermission';

export class ValidateCanGetContactList extends PermissionValidator {
	public getPermissionType(): PermissionType {
		return ContactsPermission.canGetContactList;
	}
}