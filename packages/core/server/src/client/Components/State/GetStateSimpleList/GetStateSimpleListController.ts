import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateGetStateList} from '@copor/core/domain/Components/State/validations/ValidateGetStateList';
import {GetStateList} from '@copor/core/domain/Components/State/interactor/GetStateList';
import {LogGetStateList} from '@copor/core/domain/Components/State/logger/LogGetStateList';
import {GetStateDTO} from '@copor/core/domain/Components/State/interactor/dto/GetStateDTO';
import {
	GetStateListInteractorRepoPicker
} from '@copor/core/client/Components/State/GetStateList/repo/repoPicker/GetStateListInteractorRepoPicker';
import {
	GetStateListLoggerRepoPicker
} from '@copor/core/client/Components/State/GetStateList/repo/repoPicker/GetStateListLoggerRepoPicker';
import {GetStateSimpleListPresenter} from '@copor/core/client/Components/State/GetStateSimpleList/GetStateSimpleListPresenter';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import {PaginatedResponse} from '@copor/core/client/Core/Presenter/PaginatedResponse';

interface GetStateListParams {
	id?: string;
}

export class GetStateSimpleListController extends BaseController<void, PaginatedResponse<NameAndIdDTO>> {
	async getResponse() {
		const container = this.container;
		const params = this.request.params as GetStateListParams;
		const countryId: string = params.id ?? '';

		const factory = container.getFactory(
            RunFactory<GetStateDTO[]>,
            undefined,
            this.getInteractor(countryId),
            this.getLogger(countryId)
		);
		const response = await factory.run({skipValidation: true});

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = this.container.getPresenter(GetStateSimpleListPresenter, response);
		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}
	private getValidator(countryId: string): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput = {
			actorId: this.actorId,
			countryId: countryId
		};

		return container.getValidator(
			ValidateGetStateList,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}

	private getInteractor(countryId: string) {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetStateListInteractorRepoPicker);

		return container.getInteractor(GetStateList, interactorRepo, countryId);
	}

	private getLogger(countryId: string) {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetStateListLoggerRepoPicker);

		return container.getLogger(LogGetStateList, loggerRepo, new CreateLogDetails(this.actorId), {countryId: countryId});
	}
}
