import {ValidateGetTenantDTO} from '@copor/core/domain/Components/Tenant/validations/dto/ValidateGetTenantDTO';
import {ValidateGetTenant} from '@copor/core/domain/Components/Tenant/validations/ValidateGetTenant';
import {GetTenantDTO} from '@copor/core/domain/Components/Tenant/interactor/dto/GetTenantDTO';
import {GetTenant} from '@copor/core/domain/Components/Tenant/interactor/GetTenant';
import {LogGetTenant} from '@copor/core/domain/Components/Tenant/logger/LogGetTenant';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {GetTenantViewModel} from './GetTenantViewModel';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetTenantValidatorStorageRepoPicker} from './repo/repoPicker/GetTenantValidatorStorageRepoPicker';
import {GetTenantInteractorRepoPicker} from './repo/repoPicker/GetTenantInteractorRepoPicker';
import {GetTenantLoggerRepoPicker} from './repo/repoPicker/GetTenantLoggerRepoPicker';
import {GetTenantPresenter} from './GetTenantPresenter';
import {SingleItemBaseController} from '@copor/core/client/Core/Controller/SingleItemBaseController';
import {Presenter} from '@copor/core/client/Interface/Presenter';


export class GetTenantController extends SingleItemBaseController<GetTenantDTO, GetTenantViewModel> {
	protected getPresenter(response: GetTenantDTO): Presenter<GetTenantViewModel> {
		return this.container.getPresenter(GetTenantPresenter, response);
	}

	protected getValidator(id: string) {
		const c = this.container;
		const validatorInput: ValidateGetTenantDTO = {actorId: this.actorId, tenantId: id};

		return c.getValidator(
			ValidateGetTenant,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetTenantValidatorStorageRepoPicker)
		);
	}

	protected getLogger(id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetTenantLoggerRepoPicker);
		const logData = {
			tenantId: id
		};

		return this.container.getLogger(
			LogGetTenant,
			loggerRepository,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	protected getInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetTenantInteractorRepoPicker);

		return this.container.getInteractor(
			GetTenant,
			interactorRepository,
			id
		);
	}
}
