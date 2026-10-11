import {UpdateRegionReqBodyDTO} from './dto/UpdateRegionReqBodyDTO';
import {UpdateRegionValidatorStorageRepoPicker} from './repo/repoPicker/UpdateRegionValidatorStorageRepoPicker';
import {SaveRegionDTO} from '@copor/core/domain/Components/Region/interactor/dto/SaveRegionDTO';
import {ValidateUpdateRegion} from '@copor/core/domain/Components/Region/validations/ValidateUpdateRegion';
import {UpdateRegionInteractorRepoPicker} from './repo/repoPicker/UpdateRegionInteractorRepoPicker';
import {UpdateRegion} from '@copor/core/domain/Components/Region/interactor/UpdateRegion';
import {UpdateRegionLoggerRepoPicker} from './repo/repoPicker/UpdateRegionLoggerRepoPicker';
import {
	LogDataForUpdateRegion, LogUpdateRegion
} from '@copor/core/domain/Components/Region/logger/LogUpdateRegion';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';

export class UpdateRegionController extends UpdateBaseController<UpdateRegionReqBodyDTO> {
	protected getValidator(): Validator {
		const validatorPermissionRepo = this.container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = this.container.getNewRepoPicker(
			UpdateRegionValidatorStorageRepoPicker
		);

		return this.container.getValidator(
			ValidateUpdateRegion,
			this.getValidatorInput(),
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor() {
		return this.container.getInteractor(
			UpdateRegion,
			this.container.getNewRepoPicker(UpdateRegionInteractorRepoPicker),
			this.getValidatorInput()
		);
	}

	protected getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(UpdateRegionLoggerRepoPicker);
		const logData: LogDataForUpdateRegion = this.request.body;

		return this.container.getLogger(
			LogUpdateRegion,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getValidatorInput(): SaveRegionDTO {
		return {
			... this.request.body,
			actorId: this.actorId
		};
	}
}
