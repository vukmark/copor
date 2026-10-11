import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetFormViewModel} from '@copor/core/client/Core/Form/GetFormViewModel';
import {GetRegionCityFormPresenter} from '@copor/core/client/Components/RegionCity/GetRegionCityForm/GetRegionCityFormPresenter';
import {GetRegionCityDTO} from '@copor/core/domain/Components/RegionCity/interactor/dto/GetRegionCityDTO';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ValidateGetRegionCityDTO} from '@copor/core/domain/Components/RegionCity/validations/dto/ValidateGetRegionCityDTO';
import {ValidateGetRegionCity} from '@copor/core/domain/Components/RegionCity/validations/ValidateGetRegionCity';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	GetRegionCityValidatorStorageRepoPicker
} from '@copor/core/client/Components/RegionCity/GetRegionCity/repo/repoPicker/GetRegionCityValidatorStorageRepoPicker';
import {
	GetRegionCityInteractorRepoPicker
} from '@copor/core/client/Components/RegionCity/GetRegionCity/repo/repoPicker/GetRegionCityInteractorRepoPicker';
import {GetRegionCity} from '@copor/core/domain/Components/RegionCity/interactor/GetRegionCity';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {GetRegionCityLoggerRepoPicker} from '../GetRegionCity/repo/repoPicker/GetRegionCityLoggerRepoPicker';
import {LogGetRegionCity} from '@copor/core/domain/Components/RegionCity/logger/LogGetRegionCity';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {
	GetRegionListInteractorRepoPicker
} from '@copor/core/client/Components/Region/GetRegionList/repo/repoPicker/GetRegionListInteractorRepoPicker';
import {GetRegionList} from '@copor/core/domain/Components/Region/interactor/GetRegionList';
import {
	GetRegionInteractorRepoPicker
} from '@copor/core/client/Components/Region/GetRegion/repo/repoPicker/GetRegionInteractorRepoPicker';
import {GetRegion} from '@copor/core/domain/Components/Region/interactor/GetRegion';

export interface GetRegionCityFormParams {
	id: string
}

export class GetRegionCityFormController extends BaseController<undefined, GetFormViewModel> {
	async getResponse(): Promise<void> {
		const params = this.request.params as GetRegionCityFormParams;

		if (!params?.id) {
			const presenter = this.container.getPresenter(GetRegionCityFormPresenter, {
				regionCity: this.getDefaultRegionCityData(),
				currentRegion: null
			});

			this.response.status(200);
			this.response.send(presenter.present());
			return;
		}

		const regionCityFactory = this.container.getFactory(
			RunFactory<GetRegionCityDTO>,
			this.getRegionCityValidator(this.actorId, params.id),
			this.getRegionCityInteractor(params.id),
			this.getRegionCityLogger(this.actorId, params.id)
		);

		const regionCity = await regionCityFactory.run();

		if (regionCity instanceof ErrorList) {
			this.next(regionCity);
			return;
		}

		const currentRegion = await this.getRegionInteractor(regionCity.regionId).execute();

		const presenter = this.container.getPresenter(GetRegionCityFormPresenter, {
			regionCity,
			currentRegion
		});

		this.response.status(200);
		this.response.send(presenter.present());
	}

	private getDefaultRegionCityData(): GetRegionCityDTO {
		return {
			id: '',
			regionId: '',
			city: '',
			province: '',
			provinceCode: '',
			community: '',
			communityCode: '',
			postalCode: '',
			latitude: 0,
			longitude: 0
		};
	}

	private getRegionInteractor(id: string) {
		const repo = this.container.getNewRepoPicker(GetRegionInteractorRepoPicker);

		return this.container.getInteractor(GetRegion, repo, id);
	}

	private getRegionCityValidator(actorId: string, id: string) {
		const c = this.container;

		const validatorInput: ValidateGetRegionCityDTO = {
			actorId,
			regionCityId: id
		};

		return c.getValidator(
			ValidateGetRegionCity,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetRegionCityValidatorStorageRepoPicker)
		);
	}

	private getRegionCityLogger(actorId: string, id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetRegionCityLoggerRepoPicker);

		return this.container.getLogger(
			LogGetRegionCity,
			loggerRepository,
			new CreateLogDetails(actorId),
			{regionCity: id}
		);
	}

	private getRegionCityInteractor(id: string) {
		const repo = this.container.getNewRepoPicker(GetRegionCityInteractorRepoPicker);

		return this.container.getInteractor(GetRegionCity, repo, id);
	}
}