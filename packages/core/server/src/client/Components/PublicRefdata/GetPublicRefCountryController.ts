import {GetCountry} from '@copor/core/domain/Components/Country/interactor/GetCountry';
import {LogGetCountry} from '@copor/core/domain/Components/Country/logger/LogGetCountry';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {GetCountryWithStateListDTO} from '@copor/core/domain/Components/Country/interactor/dto/GetCountryWithStateListDTO';
import {GetCountryWithStateListViewModel} from '@copor/core/client/Components/Country/GetCountry/GetCountryWithStateListViewModel';
import {GetCountryPresenter} from '@copor/core/client/Components/Country/GetCountry/GetCountryPresenter';
import {GetCountryLoggerRepoPicker} from '@copor/core/client/Components/Country/GetCountry/repo/repoPicker/GetCountryLoggerRepoPicker';
import {GetCountryInteractorRepoPicker}
	from '@copor/core/client/Components/Country/GetCountry/repo/repoPicker/GetCountryInteractorRepoPicker';
import {GetCountryValidatorStorageRepoPicker}
	from '@copor/core/client/Components/Country/GetCountry/repo/repoPicker/GetCountryValidatorStorageRepoPicker';
import {ValidatePublicRefGetCountry} from '@copor/core/domain/PublicRefdata/validation/ValidatePublicRefGetCountry';
import {ValidateGetCountryDTO} from '@copor/core/domain/Components/Country/validations/dto/ValidateGetCountryDTO';
import {SingleItemBaseController} from '@copor/core/client/Core/Controller/SingleItemBaseController';
import {Presenter} from '@copor/core/client/Interface/Presenter';

export class GetPublicRefCountryController extends SingleItemBaseController<GetCountryWithStateListDTO, GetCountryWithStateListViewModel> {
	protected getPresenter(response: GetCountryWithStateListDTO): Presenter<GetCountryWithStateListViewModel> {
		return this.container.getPresenter(GetCountryPresenter, response);
	}

	protected getValidator(id: string) {
		const c = this.container;
		const validatorInput: ValidateGetCountryDTO = {countryId: id, actorId: this.actorId};

		return c.getValidator(
			ValidatePublicRefGetCountry,
			validatorInput,
			c.getNewRepoPicker(GetCountryValidatorStorageRepoPicker),
			undefined
		);
	}

	protected getLogger(id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetCountryLoggerRepoPicker);
		const logData = {
			countryId: id
		};

		return this.container.getLogger(
			LogGetCountry,
			loggerRepository,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	protected getInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetCountryInteractorRepoPicker);

		return this.container.getInteractor(
			GetCountry,
			interactorRepository,
			id
		);
	}
}
