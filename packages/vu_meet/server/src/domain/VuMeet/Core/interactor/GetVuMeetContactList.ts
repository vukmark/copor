import {VuMeetPermission} from '@copor/vu_meet/domain/VuMeet/VuMeetPermission';
import {ListVisibleUsers} from '@copor/core/domain/User/VisibleUsers/interactor/ListVisibleUsers';

// The users the actor may start a chat with or add to a group: active users
// under the scope of vu_meet.canGetVuMeetContactList.
export class GetVuMeetContactList extends ListVisibleUsers {
	protected permissionType = VuMeetPermission.canGetVuMeetContactList;
	protected activeOnly = true;
}
