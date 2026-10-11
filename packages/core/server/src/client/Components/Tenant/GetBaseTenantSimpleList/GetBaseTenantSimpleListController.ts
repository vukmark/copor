import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetListReqBodyDTO} from '@copor/core/client/Core/dto/GetListReqBodyDTO';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import {ValidateGetTenantList} from '@copor/core/domain/Components/Tenant/validations/ValidateGetTenantList';
import {LogGetTenantList} from '@copor/core/domain/Components/Tenant/logger/LogGetTenantList';
import {GetTenantDTO} from '@copor/core/domain/Components/Tenant/interactor/dto/GetTenantDTO';
import {
	GetTenantListLoggerRepoPicker
} from '@copor/core/client/Components/Tenant/GetTenantList/repo/repoPicker/GetTenantListLoggerRepoPicker';
import {GetTenantList} from '@copor/core/domain/Components/Tenant/interactor/GetTenantList';
import {GetTenantSimpleListPresenter} from '@copor/core/client/Components/Tenant/GetTenantSimpleList/GetTenantSimpleListPresenter';
import {PaginatedResponse} from '@copor/core/client/Core/Presenter/PaginatedResponse';
import {
	GetBaseTenantListInteractorRepoPicker
} from '@copor/core/client/Components/Tenant/GetBaseTenantSimpleList/repo/repoPicker/GetBaseTenantListInteractorRepoPiker';

export class GetBaseTenantSimpleListController extends BaseController<GetListReqBodyDTO, PaginatedResponse<NameAndIdDTO>> {
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

		const presenter = container.getPresenter(
			GetTenantSimpleListPresenter,
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

		return container.getValidator(
			ValidateGetTenantList,
			this.actorId,
			validatorPermissionRepo,
			undefined
		);
	}

	private getInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetBaseTenantListInteractorRepoPicker);

		return container.getInteractor(
			GetTenantList,
			interactorRepo,
			{
				filters: this.request.body.filterList,
				offset: this.request.body.offset ?? undefined,
				limit: this.request.body.limit ?? undefined
			}
		);
	}

	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetTenantListLoggerRepoPicker);

		return container.getLogger(LogGetTenantList, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
