import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetFormViewModel} from '@copor/core/client/Core/Form/GetFormViewModel';
import {
	GetCreateUserGroupFormPresenter
} from '@copor/core/client/UserGroup/GetCreateUserGroupForm/GetCreateUserGroupFormPresenter';

export class GetCreateUserGroupFormController extends BaseController<undefined, GetFormViewModel> {
	public getResponse(): void {
		const presenter = this.container.getPresenter(GetCreateUserGroupFormPresenter, undefined);

		this.response.status(200);
		this.response.send(presenter.present());
	}
}