import {
	UpdateRegionCityReqBodyDTO
} from '@copor/core/client/Components/RegionCity/UpdateRegionCity/dto/UpdateRegionCityReqBodyDTO';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	UpdateRegionCityValidatorStorageRepoPicker
} from '@copor/core/client/Components/RegionCity/UpdateRegionCity/repo/repoPicker/UpdateRegionCityValidatorStorageRepoPicker';
import {ValidateUpdateRegionCity} from '@copor/core/domain/Components/RegionCity/validations/ValidateUpdateRegionCity';
import {SaveRegionCityDTO} from '@copor/core/domain/Components/RegionCity/interactor/dto/SaveRegionCityDTO';
import {UpdateRegionCity} from '@copor/core/domain/Components/RegionCity/interactor/UpdateRegionCity';
import {
	UpdateRegionCityInteractorRepoPicker
} from '@copor/core/client/Components/RegionCity/UpdateRegionCity/repo/repoPicker/UpdateRegionCityInteractorRepoPicker';
import {
	LogDataForUpdateRegionCity,
	LogUpdateRegionCity
} from '@copor/core/domain/Components/RegionCity/logger/LogUpdateRegionCity';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {
	UpdateRegionCityLoggerRepoPicker
} from '@copor/core/client/Components/RegionCity/UpdateRegionCity/repo/repoPicker/UpdateRegionCityLoggerRepoPicker';
import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';

export class UpdateRegionCityController extends UpdateBaseController<UpdateRegionCityReqBodyDTO> {
	protected getValidator(): Validator {
		const validatorPermissionRepo = this.container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = this.container.getNewRepoPicker(
			UpdateRegionCityValidatorStorageRepoPicker
		);

		return this.container.getValidator(
			ValidateUpdateRegionCity,
			this.getValidatorInput(),
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor() {
		return this.container.getInteractor(
			UpdateRegionCity,
			this.container.getNewRepoPicker(UpdateRegionCityInteractorRepoPicker),
			this.getValidatorInput()
		);
	}

	protected getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(UpdateRegionCityLoggerRepoPicker);
		const logData: LogDataForUpdateRegionCity = this.request.body;

		return this.container.getLogger(
			LogUpdateRegionCity,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getValidatorInput(): SaveRegionCityDTO {
		return {
			... this.request.body,
			actorId: this.actorId
		};
	}
}