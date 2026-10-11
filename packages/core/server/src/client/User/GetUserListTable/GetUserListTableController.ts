import {ValidateGetUserList} from '@copor/core/domain/User/validation/ValidateGetUserList';
import {GetUserList} from '@copor/core/domain/User/interactor/GetUserList';
import {LogGetUserList} from '@copor/core/domain/User/logger/LogGetUserList';
import {GetUserDTO} from '@copor/core/domain/User/interactor/dto/GetUserDTO';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetUserListInteractorRepoPicker} from '@copor/core/client/User/GetUserList/repo/repoPicker/GetUserListInteractorRepoPicker';
import {GetUserListLoggerRepoPicker} from '@copor/core/client/User/GetUserList/repo/repoPicker/GetUserListLoggerRepoPicker';
import {GetUserListTablePresenter} from '@copor/core/client/User/GetUserListTable/GetUserListTablePresenter';
import {PaginatedTableBaseController} from '@copor/core/client/Core/Controller/PaginatedTableBaseController';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {PaginationParams} from '@copor/core/client/Core/Presenter/PaginationParams';
import {Presenter} from '@copor/core/client/Interface/Presenter';
import {PaginatedTableModelDTO} from '@copor/core/client/Core/Table/dto/TableModelDTO';
import {KyselyRoleHelper} from '@copor/core/client/Core/Helpers/KyselyRoleHelper';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

const ADMIN_ROLE_TYPES = [
	RoleType.ADMIN,
];

export class GetUserListTableController extends PaginatedTableBaseController<GetUserDTO> {
	private canShowEditActions = false;

	async getResponse() {
		// Runs concurrently with the validate/fetch/log pipeline in RunFactory below,
		// instead of blocking it behind an extra sequential round trip.
		const actorRolePromise = KyselyRoleHelper.getUserRoleType(this.actorId);

		const factory = this.container.getFactory(
			RunFactory<GetUserDTO[]>,
			this.getValidator(),
			this.getInteractor(),
			this.getLogger()
		);

		const [response, actorRole] = await Promise.all([factory.run(), actorRolePromise]);

		this.canShowEditActions = ADMIN_ROLE_TYPES.includes(actorRole);

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

	protected getPresenter(response: GetUserDTO[], paginationParams: PaginationParams): Presenter<PaginatedTableModelDTO> {
		return new GetUserListTablePresenter(
			response,
			this.container.appContext,
			paginationParams,
			this.canShowEditActions
		);
	}

	protected getValidator(): Validator {
		return this.container.getValidator(
			ValidateGetUserList,
			this.actorId,
			this.container.getNewRepoPicker(PermissionValidatorRepoPicker),
			undefined
		);
	}

	protected getInteractor(): UseCase<GetUserDTO[]> {
		return this.container.getInteractor(
			GetUserList,
			this.container.getNewRepoPicker(GetUserListInteractorRepoPicker),
			{
				filters: this.request.body.filterList,
				offset: this.request.body.offset,
				limit: this.request.body.limit
			}
		);
	}

	protected getLogger(): LogAction {
		return this.container.getLogger(
			LogGetUserList,
			this.container.getNewRepoPicker(GetUserListLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			undefined
		);
	}
}
