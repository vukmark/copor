import path from 'path';
import {CoporModule} from '@copor/core/client/Core/Module/CoporModule';
import {contactsPermissionDefinitions} from '@copor/contacts/domain/Contacts/ContactsPermissionDefinitions';
import {contactsFeatureDefinitions} from '@copor/contacts/domain/Contacts/ContactsFeatureDefinitions';
import {ContactsRouter} from '@copor/contacts/client/Contacts/router/ContactsRouter';

// The address book: the contact list (core's user picker under
// contacts.canGetContactList) and contact details. No tables of its own.
export const contactsModule: CoporModule = {
	name: 'contacts',
	localesFolder: path.join(__dirname, 'locales'),
	permissions: contactsPermissionDefinitions,
	features: contactsFeatureDefinitions,
	routes: [
		{path: '/contacts', router: ContactsRouter}
	]
};
