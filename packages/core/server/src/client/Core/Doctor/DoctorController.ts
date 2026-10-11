import {BaseController} from '../BaseController';

export class DoctorController extends BaseController<void, void> {
	getResponse() {
		this.response.sendStatus(200);
	}
}