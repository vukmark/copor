import {BaseController} from '@copor/core/client/Core/BaseController';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {Presenter} from '@copor/core/client/Interface/Presenter';

export interface GetSingleItemParams {
	id?: string;
}

export abstract class SingleItemBaseController<
	FactoryResponse,
	ViewModel
> extends BaseController<undefined, ViewModel> {
	async getResponse(): Promise<void> {
		const params = this.request.params as GetSingleItemParams;
		const id: string | undefined = params.id;

		const validator = this.getValidator(id);

		const factory = this.container.getFactory(
			RunFactory<FactoryResponse>,
			validator,
			this.getInteractor(id),
			this.getLogger(id)
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

	protected abstract getPresenter(
		response: FactoryResponse
	): Presenter<ViewModel>;

	protected abstract getValidator(id?: string): Validator | undefined;

	protected abstract getLogger(id?: string): LogAction;

	protected abstract getInteractor(id?: string): UseCase<FactoryResponse>;
}
