import {BaseRouter} from '../../../Core/BaseRouter';
import {CreateNotificationTokenController} from '../CreateNotificationToken/CreateNotificationTokenController';
import {GetNotificationTokenListController} from '../GetNotificationTokenList/GetNotificationTokenListController';
import {
	DeleteNotificationTokenController
} from '@copor/core/client/Components/NotificationToken/DeleteNotificationToken/DeleteNotificationTokenController';

//AUTO_IMPORT_DO_NOT_EDIT
export class NotificationTokenRouter extends BaseRouter {
	protected initializeRoutes(): void {
		//AUTO_INSERT_DO_NOT_EDIT
		this.get('/:userId', GetNotificationTokenListController);
		this.post('/', CreateNotificationTokenController);
		this.delete('/:token', DeleteNotificationTokenController);
	}
}
