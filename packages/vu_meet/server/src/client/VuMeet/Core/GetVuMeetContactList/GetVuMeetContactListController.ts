import {ListVisibleUsersController} from '@copor/core/client/User/VisibleUsers/ListVisibleUsersController';
import {GetVuMeetContactList} from '@copor/vu_meet/domain/VuMeet/Core/interactor/GetVuMeetContactList';
import {ValidateGetVuMeetContactList} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateGetVuMeetContactList';
import {LogGetVuMeetContactList} from '@copor/vu_meet/domain/VuMeet/Core/logger/LogGetVuMeetContactList';

// `POST /vu-meet/contacts`: whom the actor may start a chat with or add to a group.
export class GetVuMeetContactListController extends ListVisibleUsersController {
	protected readonly interactor = GetVuMeetContactList;
	protected readonly validator = ValidateGetVuMeetContactList;
	protected readonly logger = LogGetVuMeetContactList;
}
