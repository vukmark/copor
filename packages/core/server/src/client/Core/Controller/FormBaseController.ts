import {BaseController} from '@copor/core/client/Core/BaseController';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Presenter} from '@copor/core/client/Interface/Presenter';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';

export interface FormParms {
	id: string;
}

export abstract class FormBaseController<FormDataDTO, ViewModel>
	extends BaseController<undefined, ViewModel> {
	async getResponse(): Promise<void> {
		const params = this.request.params as FormParms;
		const id: string = params.id;

		if (!params.id) {
			const presenter = this.getPresenter(this.getDefaultFormValues());

			this.response.status(200);
			this.response.send(presenter.present());

			return;
		}

		const factory = this.container.getFactory(
			RunFactory<FormDataDTO>,
			this.getValidator(id),
			this.getInteractor(id),
			this.getLogger(id)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		const presenter = this.getPresenter(response);

		this.response.status(200);
		this.response.send(presenter.present());
	}

	protected abstract getPresenter(response: FormDataDTO): Presenter<ViewModel>;

	protected abstract getDefaultFormValues() : FormDataDTO;

	protected abstract getValidator(id: string): Validator;

	protected abstract getLogger(id: string): LogAction;

	protected abstract getInteractor(id: string): UseCase<FormDataDTO>;
}
