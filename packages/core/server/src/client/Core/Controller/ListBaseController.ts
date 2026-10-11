import {BaseController} from '@copor/core/client/Core/BaseController';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {Presenter} from '@copor/core/client/Interface/Presenter';

export abstract class ListBaseController<Input, FactoryResponse, ViewModel> extends BaseController<Input, ViewModel> {
	async getResponse() {
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<FactoryResponse>,
			this.getValidator(),
			this.getInteractor(),
			this.getLogger()
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		const presenter = this.getPresenter(response);
		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}

	protected abstract getPresenter(response: FactoryResponse) : Presenter<ViewModel>;
	protected abstract getValidator(): Validator;
	protected abstract getInteractor() : UseCase<FactoryResponse>;
	protected abstract getLogger() : LogAction;
}
