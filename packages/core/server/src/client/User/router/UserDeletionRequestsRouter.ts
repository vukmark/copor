import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {
	GetUserDeletionRequestListTableController
} from '@copor/core/client/User/GetUserDeletionRequestListTable/GetUserDeletionRequestListTableController';

export class UserDeletionRequestsRouter extends BaseRouter {
	protected initializeRoutes(): void {
		this.table(GetUserDeletionRequestListTableController);
	}
}
