import {ValidateGetCountryDTO} from '@copor/core/domain/Components/Country/validations/dto/ValidateGetCountryDTO';
import {ValidateGetCountry} from '@copor/core/domain/Components/Country/validations/ValidateGetCountry';
import {GetCountry} from '@copor/core/domain/Components/Country/interactor/GetCountry';
import {LogGetCountry} from '@copor/core/domain/Components/Country/logger/LogGetCountry';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {GetCountryWithStateListViewModel} from './GetCountryWithStateListViewModel';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetCountryValidatorStorageRepoPicker} from './repo/repoPicker/GetCountryValidatorStorageRepoPicker';
import {GetCountryInteractorRepoPicker} from './repo/repoPicker/GetCountryInteractorRepoPicker';
import {GetCountryLoggerRepoPicker} from './repo/repoPicker/GetCountryLoggerRepoPicker';
import {GetCountryPresenter} from './GetCountryPresenter';
import {GetCountryWithStateListDTO} from '@copor/core/domain/Components/Country/interactor/dto/GetCountryWithStateListDTO';
import {SingleItemBaseController} from '@copor/core/client/Core/Controller/SingleItemBaseController';
import {Presenter} from '@copor/core/client/Interface/Presenter';

export class GetCountryController extends SingleItemBaseController<GetCountryWithStateListDTO, GetCountryWithStateListViewModel> {
	protected getPresenter(response: GetCountryWithStateListDTO): Presenter<GetCountryWithStateListViewModel> {
		return this.container.getPresenter(GetCountryPresenter, response);
	}

	protected getValidator(id: string) {
		const c = this.container;
		const validatorInput: ValidateGetCountryDTO = {actorId: this.actorId, countryId: id};

		return c.getValidator(
			ValidateGetCountry,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetCountryValidatorStorageRepoPicker)
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
