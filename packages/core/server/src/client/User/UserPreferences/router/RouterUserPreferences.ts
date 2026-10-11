import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {GetUserPreferencesController} from '../GetUserPreferences/GetUserPreferencesController';
import {UpdateUserPreferencesController} from '../UpdateUserPreferences/UpdateUserPreferencesController';
//AUTO_IMPORT_DO_NOT_EDIT
export class UserPreferencesRouter extends BaseRouter {
	protected initializeRoutes(): void {
		//AUTO_INSERT_DO_NOT_EDIT
		this.patch('/', UpdateUserPreferencesController);
		this.get('/', GetUserPreferencesController);
	}
}
