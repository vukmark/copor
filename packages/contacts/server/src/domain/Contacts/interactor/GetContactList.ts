import {ContactsPermission} from '@copor/contacts/domain/Contacts/ContactsPermission';
import {ListVisibleUsers} from '@copor/core/domain/User/VisibleUsers/interactor/ListVisibleUsers';

export class GetContactList extends ListVisibleUsers {
	protected permissionType = ContactsPermission.canGetContactList;
}
