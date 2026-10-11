import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {PaginatedResponse} from '@copor/core/client/Core/Presenter/PaginatedResponse';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {PaginationParams} from '@copor/core/client/Core/Presenter/PaginationParams';


export abstract class PaginatedPresenter<I, O>
	extends PresenterInstance<I[], PaginatedResponse<O>> {
	private paginationParams: PaginationParams | undefined;
	public constructor(input: I[], context: AppContext, paginationParams?: PaginationParams) {
		super(input, context);
		this.paginationParams = paginationParams;
	}
	public present(): PaginatedResponse<O> {
		return {
			items: this.input.map((dto) => this.mapItem(dto)),
			limit: this.paginationParams?.limit,
			offset: this.paginationParams?.offset
		};
	}

	protected abstract mapItem(input: I): O;
}
