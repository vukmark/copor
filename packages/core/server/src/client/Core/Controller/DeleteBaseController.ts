import {BaseController} from '@copor/core/client/Core/BaseController';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';

export interface DeleteParams {
	id: string;
}

export abstract class DeleteBaseController<Params extends DeleteParams> extends BaseController<void, void> {
	async getResponse() {
		const params = this.request.params as Params;
		const id: string = params.id;

		const factory = this.container.getFactory(
			RunFactory<void>,
			this.getValidator(id),
			this.getInteractor(id),
			this.getLogger(id)
		);

		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		this.response.status(200);
		this.response.send();
	}

	protected abstract getValidator(id: string) : Validator;

	protected abstract getInteractor(id: string) : UseCase<void>;

	protected abstract getLogger(id: string) : LogAction;
}
