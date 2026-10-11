import {BaseRouter} from '../../Core/BaseRouter';
import {GetUserAccountInformationForDisplayController}
	from '@copor/core/client/AccountInformation/GetUserAccountInformationForDisplay/GetUserAccountInformationForDisplayController';
import {UpdateUserAccountInformationController}
	from '@copor/core/client/AccountInformation/UpdateUserAccountInformation/UpdateUserAccountInformationController';
import {GetUserAccountInformationFormController}
	from '@copor/core/client/AccountInformation/GetUserAccountInformationForm/GetUserAccountInformationFormController';
import {GetPersonalAccountInformationFormController}
	from '@copor/core/client/AccountInformation/GetUserAccountInformationForm/GetPersonalAccountInformationFormController';

export class AccountInformationRouter extends BaseRouter {
	protected initializeRoutes() {
		this.get('/form/:id', GetUserAccountInformationFormController);
		this.get('/form', GetPersonalAccountInformationFormController);
		this.get('/:userId', GetUserAccountInformationForDisplayController);
		this.get('/', GetUserAccountInformationForDisplayController);
		this.patch('/', UpdateUserAccountInformationController);
		this.post('/', UpdateUserAccountInformationController);
	}
}
