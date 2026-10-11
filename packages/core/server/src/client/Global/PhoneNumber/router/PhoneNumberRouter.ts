import {BaseRouter} from '../../../Core/BaseRouter';
import {CreatePhoneNumberController} from '../CreatePhoneNumber/CreatePhoneNumberController';
import {DeletePhoneNumberController} from '../DeletePhoneNumber/DeletePhoneNumberController';
import {UpdatePhoneNumberController} from '../UpdatePhoneNumber/UpdatePhoneNumberController';
import {GetPhoneNumberListController} from '../GetPhoneNumberList/GetPhoneNumberListController';
//AUTO_IMPORT_DO_NOT_EDIT

export class PhoneNumberRouter extends BaseRouter {
	protected initializeRoutes(): void {
		//AUTO_INSERT_DO_NOT_EDIT
		this.post('/', CreatePhoneNumberController);
		this.delete('/:id', DeletePhoneNumberController);
		this.patch('/', UpdatePhoneNumberController);
		this.get('/:id', GetPhoneNumberListController);
	}
}