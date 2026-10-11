import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {GetContactListController} from '@copor/contacts/client/Contacts/GetContactList/GetContactListController';
import {GetContactInfoForUserController} from '@copor/contacts/client/Contacts/GetContactInfoForUser/GetContactInfoForUserController';
import {GetUserContactInformationController} from '@copor/contacts/client/Contacts/GetUserContactInformation/GetUserContactInformationController';

export class ContactsRouter extends BaseRouter {
	protected initializeRoutes() {
		this.post('/list', GetContactListController);
		this.get('/:id/information', GetUserContactInformationController);
		this.get('/:id', GetContactInfoForUserController);
	}
}
