import {BaseController} from '@copor/core/client/Core/BaseController';
import {ValidateGetUserList} from '@copor/core/domain/User/validation/ValidateGetUserList';
import {GetUserListInteractorRepoPicker} from './repo/repoPicker/GetUserListInteractorRepoPicker';
import {GetUserList} from '@copor/core/domain/User/interactor/GetUserList';
import {GetUserListLoggerRepoPicker} from './repo/repoPicker/GetUserListLoggerRepoPicker';
import {LogGetUserList} from '@copor/core/domain/User/logger/LogGetUserList';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {GetUserDTO} from '@copor/core/domain/User/interactor/dto/GetUserDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetUserListPresenter} from '@copor/core/client/User/GetUserList/GetUserListPresenter';
import {GetListReqBodyDTO} from '@copor/core/client/Core/dto/GetListReqBodyDTO';
import {PaginationParams} from '@copor/core/client/Core/Presenter/PaginationParams';
import {PaginatedResponse} from '@copor/core/client/Core/Presenter/PaginatedResponse';
import {GetUserViewModel} from '@copor/core/client/User/GetUser/GetUserViewModel';

export class GetUserListController extends BaseController<GetListReqBodyDTO, PaginatedResponse<GetUserViewModel>> {
	async getResponse() {
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<GetUserDTO[]>,
			this.getValidator(),
			this.getInteractor(),
			this.getLogger()
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		const hasPagination
			= this.request.body.limit !== undefined || this.request.body.offset !== undefined;

		const paginationParams: PaginationParams = hasPagination
			? {limit: this.request.body.limit, offset: this.request.body.offset}
			: {limit: undefined, offset: undefined};

		const presenter
			= this.container.getPresenter(GetUserListPresenter, response, this.container.appContext, paginationParams);
		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}
	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput = this.actorId;

		return container.getValidator(
			ValidateGetUserList,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}
	private getInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetUserListInteractorRepoPicker);

		return container.getInteractor(
			GetUserList,
			interactorRepo,
			{
				filters: this.request.body.filterList,
				limit: this.request.body.limit,
				offset: this.request.body.offset
			}
		);
	}
	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetUserListLoggerRepoPicker);

		return container.getLogger(LogGetUserList, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
