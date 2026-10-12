import {testModuleDefinitions} from '@copor/core/client/__test__/testHelper/ModuleDefinitions.helper';
import {contactsModule} from '@copor/contacts/client/Contacts/ContactsModule';
import {ContactsPermission} from '@copor/contacts/domain/Contacts/ContactsPermission';
import {ContactsFeature} from '@copor/contacts/domain/Contacts/ContactsFeature';

testModuleDefinitions(contactsModule, ContactsPermission, ContactsFeature);
