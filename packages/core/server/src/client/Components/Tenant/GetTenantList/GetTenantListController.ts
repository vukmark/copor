import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetTenantViewModel} from '../GetTenant/GetTenantViewModel';
import {ValidateGetTenantList} from '@copor/core/domain/Components/Tenant/validations/ValidateGetTenantList';
import {GetTenantListInteractorRepoPicker} from './repo/repoPicker/GetTenantListInteractorRepoPicker';
import {GetTenantList} from '@copor/core/domain/Components/Tenant/interactor/GetTenantList';
import {GetTenantListLoggerRepoPicker} from './repo/repoPicker/GetTenantListLoggerRepoPicker';
import {LogGetTenantList} from '@copor/core/domain/Components/Tenant/logger/LogGetTenantList';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {GetTenantDTO} from '@copor/core/domain/Components/Tenant/interactor/dto/GetTenantDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetTenantListPresenter} from '@copor/core/client/Components/Tenant/GetTenantList/GetTenantListPresenter';
import {GetListReqBodyDTO} from '@copor/core/client/Core/dto/GetListReqBodyDTO';
import {PaginatedResponse} from '@copor/core/client/Core/Presenter/PaginatedResponse';

export class GetTenantListController extends BaseController<GetListReqBodyDTO, PaginatedResponse<GetTenantViewModel>> {
	async getResponse() {
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<GetTenantDTO[]>,
			this.getValidator(),
			this.getInteractor(),
			this.getLogger()
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		const presenter = this.container.getPresenter(
			GetTenantListPresenter,
			response,
			this.container.appContext,
			{
				limit: this.request.body.limit,
				offset: this.request.body.offset
			}
		);
		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}
	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput = this.actorId;

		return container.getValidator(
			ValidateGetTenantList,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}
	private getInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetTenantListInteractorRepoPicker);

		return container.getInteractor(
			GetTenantList,
			interactorRepo,
			{
				filters: this.request.body.filterList,
				limit: this.request.body.limit ?? undefined,
				offset: this.request.body.offset ?? undefined
			}
		);
	}
	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetTenantListLoggerRepoPicker);

		return container.getLogger(LogGetTenantList, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
