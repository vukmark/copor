import {PermissionDefinitionDTO} from '@copor/core/domain/Core/Permission/PermissionDefinitionDTO';
import {ContactsFeature} from '@copor/contacts/domain/Contacts/ContactsFeature';
import {ContactsPermission} from '@copor/contacts/domain/Contacts/ContactsPermission';

export const contactsPermissionDefinitions: PermissionDefinitionDTO[] = [
	{
		key: ContactsPermission.canViewContactsFeature,
		feature: ContactsFeature.CONTACTS
	},
	{
		key: ContactsPermission.canGetContactList,
		feature: ContactsFeature.CONTACTS,
		requiresScope: true,
		dependsOn: [ContactsPermission.canViewContactsFeature]
	},
	{
		key: ContactsPermission.canGetContactById,
		feature: ContactsFeature.CONTACTS,
		requiresScope: true,
		dependsOn: [ContactsPermission.canGetContactList]
	},
	{
		key: ContactsPermission.canGetUserContactInformation,
		feature: ContactsFeature.CONTACTS,
		requiresScope: true,
		dependsOn: [ContactsPermission.canGetContactById]
	}
];
