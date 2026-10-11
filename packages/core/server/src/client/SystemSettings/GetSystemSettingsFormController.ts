import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetFormViewModel} from '@copor/core/client/Core/Form/GetFormViewModel';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {SystemSettingsFormPresenter} from '@copor/core/client/Interface/Presenter';

export abstract class GetSystemSettingsFormController<InteractorDTO> extends BaseController<undefined, GetFormViewModel> {
	async getResponse(): Promise<void> {
		const factory = this.container.getFactory(
			RunFactory<InteractorDTO>,
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

	protected abstract getValidator(): Validator;

	protected abstract getLogger(): LogAction;

	protected abstract getInteractor(): UseCase<InteractorDTO>;

	protected abstract getPresenter(response: InteractorDTO): SystemSettingsFormPresenter<GetFormViewModel>;
}