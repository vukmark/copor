import {BaseController} from '@copor/core/client/Core/BaseController';
import {ValidateGetCountryList} from '@copor/core/domain/Components/Country/validations/ValidateGetCountryList';
import {GetCountryList} from '@copor/core/domain/Components/Country/interactor/GetCountryList';
import {LogGetCountryList} from '@copor/core/domain/Components/Country/logger/LogGetCountryList';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {GetCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/GetCountryDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetListReqBodyDTO} from '@copor/core/client/Core/dto/GetListReqBodyDTO';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import {GetCountrySimpleListPresenter} from '@copor/core/client/Components/Country/GetCountrySimpleList/GetCountrySimpleListPresenter';
import {
	GetCountryListInteractorRepoPicker
} from '@copor/core/client/Components/Country/GetCountryList/repo/repoPicker/GetCountryListInteractorRepoPicker';
import {
	GetCountryListLoggerRepoPicker
} from '@copor/core/client/Components/Country/GetCountryList/repo/repoPicker/GetCountryListLoggerRepoPicker';
import {PaginatedResponse} from '@copor/core/client/Core/Presenter/PaginatedResponse';

export class GetCountryListSimpleListController extends BaseController<GetListReqBodyDTO, PaginatedResponse<NameAndIdDTO>> {
	async getResponse() {
		const container = this.container;
		const factory = container.getFactory(
            RunFactory<GetCountryDTO[]>,
            this.getValidator(),
            this.getInteractor(),
            this.getLogger()
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}


		const presenter = this.container.getPresenter(
			GetCountrySimpleListPresenter,
			response,
			this.container.appContext,
			{limit: this.request.body.limit, offset: this.request.body.offset});
		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}
	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput = this.actorId;

		return container.getValidator(
			ValidateGetCountryList,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}
	private getInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetCountryListInteractorRepoPicker);

		return container.getInteractor(GetCountryList, interactorRepo, {
			filters: this.request.body.filterList,
			offset: this.request.body.offset,
			limit: this.request.body.limit
		});
	}
	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetCountryListLoggerRepoPicker);

		return container.getLogger(LogGetCountryList, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
