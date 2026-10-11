import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetCountryList} from '@copor/core/domain/Components/Country/interactor/GetCountryList';
import {LogGetCountryList} from '@copor/core/domain/Components/Country/logger/LogGetCountryList';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {GetCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/GetCountryDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetCountryViewModel} from '@copor/core/client/Components/Country/GetCountry/GetCountryViewModel';
import {GetCountryListInteractorRepoPicker}
	from '@copor/core/client/Components/Country/GetCountryList/repo/repoPicker/GetCountryListInteractorRepoPicker';
import {GetCountryListLoggerRepoPicker}
	from '@copor/core/client/Components/Country/GetCountryList/repo/repoPicker/GetCountryListLoggerRepoPicker';

export class GetPublicRefCountryListController extends BaseController<void, GetCountryViewModel[]> {
	async getResponse() {
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<GetCountryDTO[]>,
			undefined,
			this.getInteractor(),
			this.getLogger()
		);
		const response = await factory.run({skipValidation: true});

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		this.response.status(200);
		this.response.send(response);
	}

	private getInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetCountryListInteractorRepoPicker);

		return container.getInteractor(GetCountryList, interactorRepo, {filters: []});
	}
	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetCountryListLoggerRepoPicker);

		return container.getLogger(LogGetCountryList, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
