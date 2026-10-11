import {BaseRouter} from '../../Core/BaseRouter';
import {LoginController} from '../Login/LoginController';
import {RefreshController} from '../Refresh/controller/RefreshController';

export class LoginRouter extends BaseRouter {
	protected initializeRoutes() {
		this.post('/', LoginController);
		this.post('/refresh', RefreshController);
	}
}
