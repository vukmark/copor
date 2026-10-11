import {ListVisibleUsersController} from '@copor/core/client/User/VisibleUsers/ListVisibleUsersController';
import {GetShareRecipientList} from '@copor/cloud/domain/Cloud/interactor/GetShareRecipientList';
import {ValidateGetShareRecipientList} from '@copor/cloud/domain/Cloud/validation/ValidateGetShareRecipientList';
import {LogGetShareRecipientList} from '@copor/cloud/domain/Cloud/logger/LogGetShareRecipientList';

// `POST /cloud/recipients`: the users the "send file to a user" dialog offers.
export class GetShareRecipientListController extends ListVisibleUsersController {
	protected readonly interactor = GetShareRecipientList;
	protected readonly validator = ValidateGetShareRecipientList;
	protected readonly logger = LogGetShareRecipientList;
}
