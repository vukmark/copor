import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {GetDashboardMenuController} from '@copor/core/client/DashboardMenu/GetDashboardMenu/GetDashboardMenuController';

export class DashboardMenuRouter extends BaseRouter {
	protected initializeRoutes(): void {
		this.get('/', GetDashboardMenuController);
	}
}
