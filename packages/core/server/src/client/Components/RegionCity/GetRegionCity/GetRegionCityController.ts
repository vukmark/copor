import {GetRegionCityDTO} from '@copor/core/domain/Components/RegionCity/interactor/dto/GetRegionCityDTO';
import {GetRegionCity} from '@copor/core/domain/Components/RegionCity/interactor/GetRegionCity';
import {LogGetRegionCity} from '@copor/core/domain/Components/RegionCity/logger/LogGetRegionCity';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {GetRegionCityViewModel} from './GetRegionCityViewModel';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetRegionCityValidatorStorageRepoPicker} from './repo/repoPicker/GetRegionCityValidatorStorageRepoPicker';
import {GetRegionCityInteractorRepoPicker} from './repo/repoPicker/GetRegionCityInteractorRepoPicker';
import {GetRegionCityLoggerRepoPicker} from './repo/repoPicker/GetRegionCityLoggerRepoPicker';
import {GetRegionCityPresenter} from './GetRegionCityPresenter';
import {ValidateGetRegionCity} from '@copor/core/domain/Components/RegionCity/validations/ValidateGetRegionCity';
import {ValidateGetRegionCityDTO} from '@copor/core/domain/Components/RegionCity/validations/dto/ValidateGetRegionCityDTO';
import {SingleItemBaseController} from '@copor/core/client/Core/Controller/SingleItemBaseController';
import {Presenter} from '@copor/core/client/Interface/Presenter';

export class GetRegionCityController extends SingleItemBaseController<GetRegionCityDTO, GetRegionCityViewModel> {
	protected getPresenter(response: GetRegionCityDTO): Presenter<GetRegionCityViewModel> {
		return this.container.getPresenter(GetRegionCityPresenter, response);
	}

	protected getValidator(id: string) {
		const c = this.container;

		const validatorInput: ValidateGetRegionCityDTO = {
			actorId: this.actorId,
			regionCityId: id
		};

		return c.getValidator(
			ValidateGetRegionCity,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetRegionCityValidatorStorageRepoPicker)
		);
	}

	protected getLogger(id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetRegionCityLoggerRepoPicker);

		const logData = {
			regionCity: id
		};

		return this.container.getLogger(
			LogGetRegionCity,
			loggerRepository,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	protected getInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetRegionCityInteractorRepoPicker);

		return this.container.getInteractor(
			GetRegionCity,
			interactorRepository,
			id
		);
	}
}