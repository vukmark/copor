import {BaseController} from '@copor/core/client/Core/BaseController';
import {ValidateGetCountryList} from '@copor/core/domain/Components/Country/validations/ValidateGetCountryList';
import {GetCountryListInteractorRepoPicker} from './repo/repoPicker/GetCountryListInteractorRepoPicker';
import {GetCountryList} from '@copor/core/domain/Components/Country/interactor/GetCountryList';
import {GetCountryListLoggerRepoPicker} from './repo/repoPicker/GetCountryListLoggerRepoPicker';
import {LogGetCountryList} from '@copor/core/domain/Components/Country/logger/LogGetCountryList';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {GetCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/GetCountryDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetCountryViewModel} from '@copor/core/client/Components/Country/GetCountry/GetCountryViewModel';
import {GetListReqBodyDTO} from '@copor/core/client/Core/dto/GetListReqBodyDTO';

export class GetCountryListController extends BaseController<GetListReqBodyDTO, GetCountryViewModel[]> {
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
		this.response.status(200);
		this.response.send(response);
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
			limit: this.request.body.limit,
			offset: this.request.body.offset
		});
	}
	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetCountryListLoggerRepoPicker);

		return container.getLogger(LogGetCountryList, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
