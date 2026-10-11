import {PaginatedTableModelDTO} from '@copor/core/client/Core/Table/dto/TableModelDTO';
import {BaseTableController} from '@copor/core/client/Core/Controller/BaseTableController';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {PaginationParams} from '@copor/core/client/Core/Presenter/PaginationParams';
import {Presenter} from '@copor/core/client/Interface/Presenter';

export abstract class PaginatedTableBaseController<Output> extends BaseTableController {
	async getResponse() {
		const factory = this.container.getFactory(
			RunFactory<Output[]>,
			this.getValidator(),
			this.getInteractor(),
			this.getLogger()
		);

		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		const paginationParams: PaginationParams = {
			limit: this.request.body.limit,
			offset: this.request.body.offset
		};

		const presenter = this.getPresenter(response, paginationParams);

		this.response.status(200).send(presenter.present());
	}

	protected abstract getPresenter(response: Output[], paginationParams: PaginationParams): Presenter<PaginatedTableModelDTO>;
	protected abstract getValidator(): Validator;
	protected abstract getInteractor(): UseCase<Output[]>;
	protected abstract getLogger(): LogAction;
}
