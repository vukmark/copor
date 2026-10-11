import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {CreateRegionCityValidatorStorageRepoPicker} from './repo/repoPicker/CreateRegionCityValidatorStorageRepoPicker';

import {ValidateCreateRegionCityDTO} from '@copor/core/domain/Components/RegionCity/validations/dto/ValidateCreateRegionCityDTO';
import {ValidateCreateRegionCity} from '@copor/core/domain/Components/RegionCity/validations/ValidateCreateRegionCity';

import {SaveRegionCityDTO} from '@copor/core/domain/Components/RegionCity/interactor/dto/SaveRegionCityDTO';
import {CreateRegionCityInteractorRepoPicker} from './repo/repoPicker/CreateRegionCityInteractorRepoPicker';
import {CreateRegionCity} from '@copor/core/domain/Components/RegionCity/interactor/CreateRegionCity';

import {CreateRegionCityLoggerRepoPicker} from './repo/repoPicker/CreateRegionCityLoggerRepoPicker';
import {
	LogCreateRegionCity,
	LogDataForCreateRegionCity
} from '@copor/core/domain/Components/RegionCity/logger/LogCreateRegionCity';

import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {
	CreateRegionCityReqBodyDTO
} from '@copor/core/client/Components/RegionCity/CreateRegionCity/dto/CreateRegionCityReqBodyDTO';
import {CreateBaseController} from '@copor/core/client/Core/Controller/CreateBaseController';

export class CreateRegionCityController extends CreateBaseController<CreateRegionCityReqBodyDTO> {
	protected getValidator(): Validator {
		const container = this.container;

		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = container.getNewRepoPicker(CreateRegionCityValidatorStorageRepoPicker);

		const validatorInput: ValidateCreateRegionCityDTO = {
			... this.request.body,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateCreateRegionCity,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor(uniqueId: string): UseCase<string> {
		const container = this.container;

		const interactorInput: SaveRegionCityDTO = {
			... this.request.body,
			actorId: this.actorId,
			id: uniqueId
		};

		const interactorRepo = container.getNewRepoPicker(CreateRegionCityInteractorRepoPicker);

		return container.getInteractor(
			CreateRegionCity,
			interactorRepo,
			interactorInput
		);
	}

	protected getLogger(uniqueId: string): LogAction {
		const container = this.container;

		const loggerRepo = container.getNewRepoPicker(CreateRegionCityLoggerRepoPicker);
		const logData = this.getLogData(uniqueId);

		return container.getLogger(
			LogCreateRegionCity,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	protected getLogData(uniqueId: string): LogDataForCreateRegionCity {
		return {
			... this.request.body,
			id: uniqueId
		};
	}
}