import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetFormViewModel} from '@copor/core/client/Core/Form/GetFormViewModel';
import {
	SendTestEmailFormPresenter
} from '@copor/core/client/SystemSettings/SendTestEmail/SendTestEmailFormPresenter';
import {SendTestEmailDTO} from '@copor/core/client/SystemSettings/SendTestEmail/SendTestEmailController';

export class SendTestEmailFormController extends BaseController<undefined, GetFormViewModel> {
	async getResponse(): Promise<void> {
		const presenterInput: SendTestEmailDTO = {message: '', receiver: ''};

		const presenter = this.container.getPresenter(
			SendTestEmailFormPresenter, presenterInput
		);

		this.response.status(200);
		this.response.send(presenter.present());
	}
}