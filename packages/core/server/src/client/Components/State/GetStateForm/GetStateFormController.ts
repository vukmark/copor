import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetFormViewModel} from '@copor/core/client/Core/Form/GetFormViewModel';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetStateDTO} from '@copor/core/domain/Components/State/interactor/dto/GetStateDTO';
import {GetStateFormPresenter} from '@copor/core/client/Components/State/GetStateForm/GetStateFormPresenter';
import {ValidateGetStateDTO} from '@copor/core/domain/Components/State/validations/dto/ValidateGetStateDTO';
import {ValidateGetState} from '@copor/core/domain/Components/State/validations/ValidateGetState';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	GetStateValidatorStorageRepoPicker
} from '@copor/core/client/Components/State/GetState/repo/repoPicker/GetStateValidatorStorageRepoPicker';
import {GetStateLoggerRepoPicker} from '@copor/core/client/Components/State/GetState/repo/repoPicker/GetStateLoggerRepoPicker';
import {LogGetState} from '@copor/core/domain/Components/State/logger/LogGetState';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {GetStateInteractorRepoPicker} from '@copor/core/client/Components/State/GetState/repo/repoPicker/GetStateInteractorRepoPicker';
import {GetState} from '@copor/core/domain/Components/State/interactor/GetState';
import {GetCountryList} from '@copor/core/domain/Components/Country/interactor/GetCountryList';
import {
	GetCountryListInteractorRepoPicker
} from '@copor/core/client/Components/Country/GetCountryList/repo/repoPicker/GetCountryListInteractorRepoPicker';
import {CountryKyselyHelper} from '@copor/core/client/Components/Country/repositoryHelper/CountryKyselyHelper';

export interface GetStateParams {
	id: string;
}

export class GetStateFormController extends BaseController<undefined, GetFormViewModel> {
	async getResponse(): Promise<void> {
		const params = this.request.params as GetStateParams;

		const countryList = await this.getCountryListInteractor().execute();
		const germanyCountryId = await CountryKyselyHelper.getGermanyCountryId();

		if (!params.id) {
			const presenter = this.container.getPresenter(GetStateFormPresenter, {
				state: undefined,
				countryList,
				germanyCountryId
			});

			this.response.status(200);
			this.response.send(presenter.present());
			return;
		}

		const actorId = this.actorId;

		const stateFactory = this.container.getFactory(
            RunFactory<GetStateDTO>,
            this.getStateValidator(actorId, params.id),
            this.getStateInteractor(params.id),
            this.getStateLogger(actorId, params.id)
		);

		const state = await stateFactory.run();

		if (state instanceof ErrorList) {
			this.next(state);
			return;
		}

		const presenter = this.container.getPresenter(GetStateFormPresenter, {
			state,
			countryList,
			germanyCountryId
		});

		this.response.status(200);
		this.response.send(presenter.present());
	}

	private getCountryListInteractor() {
		const interactorRepo = this.container.getNewRepoPicker(GetCountryListInteractorRepoPicker);

		return this.container.getInteractor(GetCountryList, interactorRepo, {filters: []});
	}

	private getStateValidator(actorId: string, id: string) {
		const validatorInput: ValidateGetStateDTO = {actorId, stateId: id};

		return this.container.getValidator(
			ValidateGetState,
			validatorInput,
			this.container.getNewRepoPicker(PermissionValidatorRepoPicker),
			this.container.getNewRepoPicker(GetStateValidatorStorageRepoPicker)
		);
	}

	private getStateLogger(actorId: string, id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetStateLoggerRepoPicker);
		const logData = {stateId: id};

		return this.container.getLogger(LogGetState, loggerRepository, new CreateLogDetails(actorId), logData);
	}

	private getStateInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetStateInteractorRepoPicker);

		return this.container.getInteractor(GetState, interactorRepository, id);
	}
}
