import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ListVisibleUsersRepoPicker} from './repo/repoPicker/ListVisibleUsersRepoPicker';
import {ListVisibleUsersLoggerRepoPicker} from './repo/repoPicker/ListVisibleUsersLoggerRepoPicker';
import {ListVisibleUsers} from '@copor/core/domain/User/VisibleUsers/interactor/ListVisibleUsers';
import {VisibleUserDTO} from '@copor/core/domain/User/VisibleUsers/interactor/dto/VisibleUserDTO';
import {ListItemsUseCaseInput} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';
import {ListVisibleUsersRepo} from '@copor/core/domain/User/VisibleUsers/repository/ListVisibleUsersRepo';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';
import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {LogGeneralDetails} from '@copor/core/domain/Core/Logger/Logger';
import {VisibleUserPresenter} from './VisibleUserPresenter';
import {VisibleUserViewModel} from './VisibleUserViewModel';
import {GetListReqBodyDTO} from '@copor/core/client/Core/dto/GetListReqBodyDTO';
import {PaginatedResponse} from '@copor/core/client/Core/Presenter/PaginatedResponse';
import {PaginationParams} from '@copor/core/client/Core/Presenter/PaginationParams';
import {DEFAULT_LIST_LIMIT, DEFAULT_LIST_OFFSET} from '@copor/core/client/Core/Pagination/PaginationDefaults';

// A user picker route: the users the actor may see, paged and searchable
// (SEARCH filter). Core has no route of its own; a module extends this with its
// interactor (a ListVisibleUsers under the module's permission), the validator
// checking that permission and its log type, and registers it on its router.
export abstract class ListVisibleUsersController
	extends BaseController<GetListReqBodyDTO, PaginatedResponse<VisibleUserViewModel>> {
	protected abstract readonly interactor: new (input: ListItemsUseCaseInput, repo: ListVisibleUsersRepo) => ListVisibleUsers;
	protected abstract readonly validator: new (input: string, permissionRepo: PermissionRepository) => ValidationWithPermission<string>;
	protected abstract readonly logger: new (repository: NoDataLogRepository, logDetails: LogGeneralDetails) => NoDataLogger;

	async getResponse() {
		const container = this.container;
		// Always resolve and echo the page window, so clients can page without
		// guessing what the server defaulted to.
		const paginationParams: PaginationParams = {
			limit: this.request.body?.limit ?? String(DEFAULT_LIST_LIMIT),
			offset: this.request.body?.offset ?? String(DEFAULT_LIST_OFFSET)
		};
		const factory = container.getFactory(
			RunFactory<VisibleUserDTO[]>,
			this.getValidator(),
			this.getInteractor(paginationParams),
			this.getLogger()
		);

		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		const presenter = container.getPresenter(VisibleUserPresenter, response, container.appContext, paginationParams);

		this.response.status(200);
		this.response.send(presenter.present());
	}

	private getValidator() {
		const container = this.container;

		return container.getValidator(
			this.validator,
			this.actorId,
			container.getNewRepoPicker(PermissionValidatorRepoPicker),
			undefined
		);
	}

	private getInteractor(paginationParams: PaginationParams) {
		const container = this.container;

		return container.getInteractor(
			this.interactor,
			container.getNewRepoPicker(ListVisibleUsersRepoPicker),
			{
				filters: this.request.body?.filterList ?? [],
				actorId: this.actorId,
				limit: paginationParams.limit,
				offset: paginationParams.offset
			}
		);
	}

	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(ListVisibleUsersLoggerRepoPicker);

		return container.getLogger(this.logger, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
