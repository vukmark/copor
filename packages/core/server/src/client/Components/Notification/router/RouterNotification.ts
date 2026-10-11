import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {GetNotificationListController} from '../GetNotificationList/GetNotificationListController';
import {CountUnreadNotificationsController} from '../CountUnreadNotifications/CountUnreadNotificationsController';
import {MarkAllNotificationsAsReadController} from '../MarkAllNotificationsAsRead/MarkAllNotificationsAsReadController';

//AUTO_IMPORT_DO_NOT_EDIT

export class NotificationRouter extends BaseRouter {
	protected initializeRoutes(): void {
		//AUTO_INSERT_DO_NOT_EDIT
		this.get('/', GetNotificationListController);
		this.get('/count', CountUnreadNotificationsController);
		this.patch('/mark-read', MarkAllNotificationsAsReadController);
	}
}
