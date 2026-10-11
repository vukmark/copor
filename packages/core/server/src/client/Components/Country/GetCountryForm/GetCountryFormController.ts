import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetFormViewModel} from '@copor/core/client/Core/Form/GetFormViewModel';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

import {GetCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/GetCountryDTO';
import {GetCountryFormPresenter} from '@copor/core/client/Components/Country/GetCountryForm/GetCountryFormPresenter';

import {ValidateGetCountryDTO} from '@copor/core/domain/Components/Country/validations/dto/ValidateGetCountryDTO';
import {ValidateGetCountry} from '@copor/core/domain/Components/Country/validations/ValidateGetCountry';

import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	GetCountryValidatorStorageRepoPicker
} from '@copor/core/client/Components/Country/GetCountry/repo/repoPicker/GetCountryValidatorStorageRepoPicker';
import {
	GetCountryLoggerRepoPicker
} from '@copor/core/client/Components/Country/GetCountry/repo/repoPicker/GetCountryLoggerRepoPicker';
import {LogGetCountry} from '@copor/core/domain/Components/Country/logger/LogGetCountry';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';

import {
	GetCountryInteractorRepoPicker
} from '@copor/core/client/Components/Country/GetCountry/repo/repoPicker/GetCountryInteractorRepoPicker';
import {GetCountry} from '@copor/core/domain/Components/Country/interactor/GetCountry';

import {
	GetStateListInteractorRepoPicker
} from '@copor/core/client/Components/State/GetStateList/repo/repoPicker/GetStateListInteractorRepoPicker';
import {GetStateList} from '@copor/core/domain/Components/State/interactor/GetStateList';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface GetCountryParams {
	id: string;
}

export class GetCountryFormController extends BaseController<undefined, GetFormViewModel> {
	async getResponse(): Promise<void> {
		const params = this.request.params as GetCountryParams;

		const stateList = params.id
			? await this.getStateListInteractor(params.id).execute()
			: [];

		if (!params.id) {
			const presenter = this.container.getPresenter(GetCountryFormPresenter, {
				country: this.getDefaultCountry(),
				stateList
			});

			this.response.status(200);
			this.response.send(presenter.present());
			return;
		}

		const countryFactory = this.container.getFactory(
            RunFactory<GetCountryDTO>,
            this.getCountryValidator(this.actorId, params.id),
            this.getCountryInteractor(params.id),
            this.getCountryLogger(this.actorId, params.id)
		);

		const country = await countryFactory.run();

		if (country instanceof ErrorList) {
			this.next(country);
			return;
		}

		const presenter = this.container.getPresenter(GetCountryFormPresenter, {
			country: country,
			stateList: stateList
		});

		this.response.status(200);
		this.response.send(presenter.present());
	}
	private getDefaultCountry(): GetCountryDTO {
		return {
			id: '',
			name: '',
			code: '',
			publishStatus: PublishStatus.unpublished
		};
	}

	private getCountryValidator(actorId: string, id: string) {
		const c = this.container;
		const validatorInput: ValidateGetCountryDTO = {
			actorId: actorId,
			countryId: id
		};

		return c.getValidator(
			ValidateGetCountry,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetCountryValidatorStorageRepoPicker)
		);
	}

	private getCountryLogger(actorId: string, id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetCountryLoggerRepoPicker);
		const logData = {countryId: id};

		return this.container.getLogger(
			LogGetCountry,
			loggerRepository,
			new CreateLogDetails(actorId),
			logData
		);
	}

	private getCountryInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetCountryInteractorRepoPicker);

		return this.container.getInteractor(
			GetCountry,
			interactorRepository,
			id
		);
	}

	private getStateListInteractor(countryId: string) {
		const interactorRepo = this.container.getNewRepoPicker(GetStateListInteractorRepoPicker);

		return this.container.getInteractor(GetStateList, interactorRepo, countryId);
	}
}
