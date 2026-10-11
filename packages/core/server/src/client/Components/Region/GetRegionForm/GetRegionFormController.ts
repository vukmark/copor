import {BaseController} from '@copor/core/client/Core/BaseController';
import {ValidateGetRegionDTO} from '@copor/core/domain/Components/Region/validations/dto/ValidateGetRegionDTO';
import {ValidateGetRegion} from '@copor/core/domain/Components/Region/validations/ValidateGetRegion';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {LogGetRegion} from '@copor/core/domain/Components/Region/logger/LogGetRegion';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {GetRegion} from '@copor/core/domain/Components/Region/interactor/GetRegion';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {GetRegionDTO} from '@copor/core/domain/Components/Region/interactor/dto/GetRegionDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetCountryListInteractorRepoPicker}
	from '@copor/core/client/Components/Country/GetCountryList/repo/repoPicker/GetCountryListInteractorRepoPicker';
import {GetCountryList} from '@copor/core/domain/Components/Country/interactor/GetCountryList';
import {GetStateListInteractorRepoPicker} from '@copor/core/client/Components/State/GetStateList/repo/repoPicker/GetStateListInteractorRepoPicker';
import {GetStateList} from '@copor/core/domain/Components/State/interactor/GetStateList';
import {GetRegionFormPresenter} from './GetRegionFormPresenter';
import {
	GetRegionValidatorStorageRepoPicker
} from '@copor/core/client/Components/Region/GetRegion/repo/repoPicker/GetRegionValidatorStorageRepoPicker';
import {GetRegionLoggerRepoPicker} from '@copor/core/client/Components/Region/GetRegion/repo/repoPicker/GetRegionLoggerRepoPicker';
import {
	GetRegionInteractorRepoPicker
} from '@copor/core/client/Components/Region/GetRegion/repo/repoPicker/GetRegionInteractorRepoPicker';
import {GetFormViewModel} from '@copor/core/client/Core/Form/GetFormViewModel';
import {GetCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/GetCountryDTO';

export interface GetRegionFormParams {
	id: string;
}

export class GetRegionFormController extends BaseController<undefined, GetFormViewModel> {
	async getResponse(): Promise<void> {
		const params = this.request.params as GetRegionFormParams;
		const countryList = await this.getCountryListInteractor().execute();

		const germany = countryList.find((country) => country.code === 'DE');

		if (!germany) {
			throw new Error('Unable to get Germany from database.');
		}

		if (!params.id) {
			const presenter = this.container.getPresenter(GetRegionFormPresenter, {
				region: this.getDefaultRegionData(germany),
				countryList,
				stateList: await this.getStateListInteractor(germany.id).execute()
			});

			this.response.status(200);
			this.response.send(presenter.present());

			return;
		}

		const regionFactory = this.container.getFactory(
            RunFactory<GetRegionDTO>,
            this.getRegionValidator(this.actorId, params.id),
            this.getRegionInteractor(params.id),
            this.getRegionLogger(this.actorId, params.id)
		);
		const region = await regionFactory.run();

		if (region instanceof ErrorList) {
			this.next(region);
			return;
		}
		const stateList = await this.getStateListInteractor(germany.id).execute();

		const presenter = this.container.getPresenter(GetRegionFormPresenter, {
			region: region,
			countryList: countryList,
			stateList: stateList
		});

		this.response.status(200);
		this.response.send(presenter.present());
	}
	private getDefaultRegionData(germany: GetCountryDTO) : GetRegionDTO {
		return {
			id: '',
			country: {id: germany.id, name: germany.name},
			state: {id: '', name: ''},
			postalCode: '',
			cityList: []
		};
	}

	private getCountryListInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetCountryListInteractorRepoPicker);

		return container.getInteractor(GetCountryList, interactorRepo, {filters: []});
	}

	private getStateListInteractor(countryId?: string) {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetStateListInteractorRepoPicker);

		return container.getInteractor(GetStateList, interactorRepo, countryId ?? '');
	}


	private getRegionValidator(actorId: string, id: string) {
		const c = this.container;
		const validatorInput: ValidateGetRegionDTO = {actorId, regionId: id};

		return c.getValidator(
			ValidateGetRegion,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetRegionValidatorStorageRepoPicker)
		);
	}

	private getRegionLogger(actorId: string, id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetRegionLoggerRepoPicker);
		const logData = {region: id};

		return this.container.getLogger(
			LogGetRegion,
			loggerRepository,
			new CreateLogDetails(actorId),
			logData
		);
	}

	private getRegionInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetRegionInteractorRepoPicker);

		return this.container.getInteractor(GetRegion, interactorRepository, id);
	}
}
