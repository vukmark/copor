import {BaseController} from '@copor/core/client/Core/BaseController';
import {UpdateTenantReqBodyDTO} from './dto/UpdateTenantReqBodyDTO';
import {UpdateTenantValidatorStorageRepoPicker} from './repo/repoPicker/UpdateTenantValidatorStorageRepoPicker';
import {SaveTenantDTO} from '@copor/core/domain/Components/Tenant/interactor/dto/SaveTenantDTO';
import {ValidateUpdateTenant} from '@copor/core/domain/Components/Tenant/validations/ValidateUpdateTenant';
import {UpdateTenantInteractorRepoPicker} from './repo/repoPicker/UpdateTenantInteractorRepoPicker';
import {UpdateTenant} from '@copor/core/domain/Components/Tenant/interactor/UpdateTenant';
import {UpdateTenantLoggerRepoPicker} from './repo/repoPicker/UpdateTenantLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {LogDataForUpdateTenant, LogUpdateTenant} from '@copor/core/domain/Components/Tenant/logger/LogUpdateTenant';

export class UpdateTenantController extends BaseController<UpdateTenantReqBodyDTO, void> {
	async getResponse() {
		const factory = this.container.getFactory(
			RunFactory,
			this.getValidator(),
			this.getInteractor(),
			this.getLogger()
		);

		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		this.response.status(200);
		this.response.send(response);
	}

	private getValidator(): Validator {
		const validatorPermissionRepo = this.container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = this.container.getNewRepoPicker(
			UpdateTenantValidatorStorageRepoPicker
		);

		return this.container.getValidator(
			ValidateUpdateTenant,
			this.getValidatorInput(),
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	private getInteractor() {
		return this.container.getInteractor(
			UpdateTenant,
			this.container.getNewRepoPicker(UpdateTenantInteractorRepoPicker),
			this.getValidatorInput()
		);
	}

	private getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(UpdateTenantLoggerRepoPicker);
		const logData: LogDataForUpdateTenant = {
			... this.request.body
		};

		return this.container.getLogger(
			LogUpdateTenant,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getValidatorInput(): SaveTenantDTO {
		return {
			... this.request.body,
			regionCityId: this.request.body.regionCityId,
			actorId: this.actorId
		};
	}
}
