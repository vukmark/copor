import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateTenantReqBodyDTO} from './dto/CreateTenantReqBodyDTO';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {CreateTenantValidatorStorageRepoPicker} from './repo/repoPicker/CreateTenantValidatorStorageRepoPicker';
import {ValidateCreateTenantDTO} from '@copor/core/domain/Components/Tenant/validations/dto/ValidateCreateTenantDTO';
import {ValidateCreateTenant} from '@copor/core/domain/Components/Tenant/validations/ValidateCreateTenant';
import {SaveTenantDTO} from '@copor/core/domain/Components/Tenant/interactor/dto/SaveTenantDTO';
import {CreateTenantInteractorRepoPicker} from './repo/repoPicker/CreateTenantInteractorRepoPicker';
import {CreateTenant} from '@copor/core/domain/Components/Tenant/interactor/CreateTenant';
import {CreateTenantLoggerRepoPicker} from './repo/repoPicker/CreateTenantLoggerRepoPicker';
import {LogCreateTenant, LogDataForCreateTenant} from '@copor/core/domain/Components/Tenant/logger/LogCreateTenant';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {IdGenerator} from '@copor/core/client/Core/IdGenerator/IdGenerator';

export class CreateTenantController extends BaseController<CreateTenantReqBodyDTO, string> {
	async getResponse() {
		const container = this.container;
		const uniqueId = await this.getUniqueId();

		const factory = container.getFactory(
			RunFactory<string>,
			this.getValidator(),
			this.getInteractor(uniqueId),
			this.getLogger(uniqueId)
		);

		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		this.response.status(200);
		this.response.send(response);
	}

	private async getUniqueId(): Promise<string> {
		const uniqueIdGenerator = this.container.getRepository(IdGenerator);

		return await uniqueIdGenerator.getNewId();
	}

	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = container.getNewRepoPicker(CreateTenantValidatorStorageRepoPicker);
		const validatorInput: ValidateCreateTenantDTO = {
			... this.request.body,
			regionCityId: this.request.body.regionCityId,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateCreateTenant,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	private getInteractor(uniqueId: string): UseCase<string> {
		const container = this.container;
		const interactorInput: SaveTenantDTO = {
			... this.request.body,
			regionCityId: this.request.body.regionCityId,
			actorId: this.actorId,
			id: uniqueId
		};
		const interactorRepo = container.getNewRepoPicker(CreateTenantInteractorRepoPicker);

		return container.getInteractor(
			CreateTenant,
			interactorRepo,
			interactorInput
		);
	}

	private getLogger(uniqueId: string) : LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(CreateTenantLoggerRepoPicker);
		const logData = this.getLogData(uniqueId);

		return container.getLogger(
			LogCreateTenant,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getLogData(uniqueId: string): LogDataForCreateTenant {
		return {
			... this.request.body,
			id: uniqueId
		};
	}
}
