import {ListVisibleUsersController} from '@copor/core/client/User/VisibleUsers/ListVisibleUsersController';
import {GetContactList} from '@copor/contacts/domain/Contacts/interactor/GetContactList';
import {ValidateGetContactList} from '@copor/contacts/domain/Contacts/validation/ValidateGetContactList';
import {LogGetContactList} from '@copor/contacts/domain/Contacts/logger/LogGetContactList';

export class GetContactListController extends ListVisibleUsersController {
	protected readonly interactor = GetContactList;
	protected readonly validator = ValidateGetContactList;
	protected readonly logger = LogGetContactList;
}
