import {ValidateDeleteTenantDTO} from '@copor/core/domain/Components/Tenant/validations/dto/ValidateDeleteTenantDTO';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {DeleteTenantValidatorStorageRepoPicker} from './repo/repoPicker/DeleteTenantValidatorStorageRepoPicker';
import {ValidateDeleteTenant} from '@copor/core/domain/Components/Tenant/validations/ValidateDeleteTenant';
import {DeleteTenantInteractorRepoPicker} from './repo/repoPicker/DeleteTenantInteractorRepoPicker';
import {DeleteTenant} from '@copor/core/domain/Components/Tenant/interactor/DeleteTenant';
import {LogDeleteTenant} from '@copor/core/domain/Components/Tenant/logger/LogDeleteTenant';
import {DeleteTenantLoggerRepoPicker} from './repo/repoPicker/DeleteTenantLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {DeleteBaseController} from '@copor/core/client/Core/Controller/DeleteBaseController';

export interface DeleteTenantParams {
	id: string;
}

export class DeleteTenantController extends DeleteBaseController<DeleteTenantParams> {
	protected getValidator(id: string) : Validator {
		const c = this.container;
		const input: ValidateDeleteTenantDTO = {
			actorId: this.actorId,
			tenantId: id
		};

		return c.getValidator(
			ValidateDeleteTenant,
			input,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(DeleteTenantValidatorStorageRepoPicker)
		);
	}

	protected getInteractor(id: string) : UseCase<void> {
		const c = this.container;
		const repo = c.getNewRepoPicker(DeleteTenantInteractorRepoPicker);

		return c.getInteractor(DeleteTenant, repo, id);
	}

	protected getLogger(id: string) : LogAction {
		return this.container.getLogger(
			LogDeleteTenant,
			this.container.getNewRepoPicker(DeleteTenantLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{tenantId: id}
		);
	}
}
