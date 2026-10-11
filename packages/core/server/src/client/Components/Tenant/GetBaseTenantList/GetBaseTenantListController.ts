import {BaseController} from '@copor/core/client/Core/BaseController';
import {ValidateGetTenantList} from '@copor/core/domain/Components/Tenant/validations/ValidateGetTenantList';
import {GetTenantList} from '@copor/core/domain/Components/Tenant/interactor/GetTenantList';
import {LogGetTenantList} from '@copor/core/domain/Components/Tenant/logger/LogGetTenantList';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {GetTenantDTO} from '@copor/core/domain/Components/Tenant/interactor/dto/GetTenantDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	GetTenantListLoggerRepoPicker
} from '@copor/core/client/Components/Tenant/GetTenantList/repo/repoPicker/GetTenantListLoggerRepoPicker';
import {
	GetBaseTenantListInteractorRepoPicker
} from '@copor/core/client/Components/Tenant/GetBaseTenantList/repo/repoPicker/GetBaseTenantListInteractorRepoPicker';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import {GetBaseTenantListPresenter} from '@copor/core/client/Components/Tenant/GetBaseTenantList/GetBaseTenantListPresenter';

export class GetBaseTenantListController extends BaseController<undefined, NameAndIdDTO[]> {
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

		const presenter = this.container.getPresenter(GetBaseTenantListPresenter, response);
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
		const interactorRepo = this.container.getNewRepoPicker(GetBaseTenantListInteractorRepoPicker);

		return container.getInteractor(GetTenantList, interactorRepo, {filters: []});
	}
	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetTenantListLoggerRepoPicker);

		return container.getLogger(LogGetTenantList, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
