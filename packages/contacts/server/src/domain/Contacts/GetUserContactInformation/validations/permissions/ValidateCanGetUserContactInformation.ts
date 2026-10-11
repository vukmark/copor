import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {ContactsPermission} from '@copor/contacts/domain/Contacts/ContactsPermission';

export interface ValidateCanGetUserContactInformationContext {
	userId: string;
}

export class ValidateCanGetUserContactInformation extends PermissionValidator<ValidateCanGetUserContactInformationContext> {
	public getPermissionType(): PermissionType {
		return ContactsPermission.canGetUserContactInformation;
	}
}