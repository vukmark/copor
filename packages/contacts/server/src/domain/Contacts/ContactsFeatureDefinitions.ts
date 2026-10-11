import {FeatureDefinitionDTO} from '@copor/core/domain/FeatureList/FeatureDefinitionDTO';
import {ContactsFeature} from '@copor/contacts/domain/Contacts/ContactsFeature';
import {ContactsPermission} from '@copor/contacts/domain/Contacts/ContactsPermission';

export const contactsFeatureDefinitions: FeatureDefinitionDTO[] = [
	{
		key: ContactsFeature.CONTACTS,
		viewPermission: ContactsPermission.canViewContactsFeature,
		menuItem: {icon: 'addressBook', labelKey: 'CONTACTS', order: 20}
	}
];
