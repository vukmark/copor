import {CloudPermission} from '@copor/cloud/domain/Cloud/CloudPermission';
import {ListVisibleUsers} from '@copor/core/domain/User/VisibleUsers/interactor/ListVisibleUsers';

// The users the actor may send a file to (into their Public folder).
export class GetShareRecipientList extends ListVisibleUsers {
	protected permissionType = CloudPermission.canGetShareRecipientList;
	protected activeOnly = true;
}
