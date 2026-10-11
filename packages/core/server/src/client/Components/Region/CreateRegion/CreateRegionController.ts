import {CreateRegionReqBodyDTO} from './dto/CreateRegionReqBodyDTO';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {CreateRegionValidatorStorageRepoPicker} from './repo/repoPicker/CreateRegionValidatorStorageRepoPicker';
import {ValidateCreateRegionDTO}
	from '@copor/core/domain/Components/Region/validations/dto/ValidateCreateRegionDTO';
import {ValidateCreateRegion} from '@copor/core/domain/Components/Region/validations/ValidateCreateRegion';
import {SaveRegionDTO} from '@copor/core/domain/Components/Region/interactor/dto/SaveRegionDTO';
import {CreateRegionInteractorRepoPicker} from './repo/repoPicker/CreateRegionInteractorRepoPicker';
import {CreateRegion} from '@copor/core/domain/Components/Region/interactor/CreateRegion';
import {CreateRegionLoggerRepoPicker} from './repo/repoPicker/CreateRegionLoggerRepoPicker';
import {
	LogCreateRegion,
	LogDataForCreateRegion
} from '@copor/core/domain/Components/Region/logger/LogCreateRegion';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {
	GetCountryListInteractorRepoPicker
} from '@copor/core/client/Components/Country/GetCountryList/repo/repoPicker/GetCountryListInteractorRepoPicker';
import {GetCountryList} from '@copor/core/domain/Components/Country/interactor/GetCountryList';
import {BaseController} from '@copor/core/client/Core/BaseController';
import {IdGenerator} from '@copor/core/client/Core/IdGenerator/IdGenerator';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

export class CreateRegionController extends BaseController<CreateRegionReqBodyDTO, string> {
	async getResponse() {
		const container = this.container;
		const uniqueId = await this.getUniqueId();
		const country = this.request.body.country ?? (await this.getGermany()).id;

		const factory = container.getFactory(
			RunFactory<string>,
			this.getValidator(country),
			this.getInteractor(uniqueId, country),
			this.getLogger(uniqueId, country)
		);

		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		this.response.status(200);
		this.response.send(response);
	}

	protected getValidator(country: string): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = container.getNewRepoPicker(CreateRegionValidatorStorageRepoPicker);

		const validatorInput: ValidateCreateRegionDTO = {
			... this.request.body,
			country,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateCreateRegion,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor(uniqueId: string, country: string) : UseCase<string> {
		const container = this.container;
		const interactorInput: SaveRegionDTO = {
			... this.request.body,
			country,
			actorId: this.actorId,
			id: uniqueId
		};
		const interactorRepo = container.getNewRepoPicker(CreateRegionInteractorRepoPicker);

		return container.getInteractor(
			CreateRegion,
			interactorRepo,
			interactorInput
		);
	}

	protected getLogger(uniqueId: string, country: string) : LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(CreateRegionLoggerRepoPicker);
		const logData = this.getLogData(uniqueId, country);

		return container.getLogger(
			LogCreateRegion,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getLogData(uniqueId: string, country: string): LogDataForCreateRegion {
		return {
			... this.request.body,
			country,
			id: uniqueId
		};
	}

	private async getUniqueId(): Promise<string> {
		const uniqueIdGenerator = this.container.getRepository(IdGenerator);

		return await uniqueIdGenerator.getNewId();
	}

	private getCountryListInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetCountryListInteractorRepoPicker);

		return container.getInteractor(GetCountryList, interactorRepo, {filters: []});
	}


	private async getGermany() {
		const countryList = await this.getCountryListInteractor().execute();

		const germany = countryList.find((country) => country.code === 'DE');

		if (!germany) {
			throw new Error('Unable to get Germany from database.');
		}

		return germany;
	}
}
