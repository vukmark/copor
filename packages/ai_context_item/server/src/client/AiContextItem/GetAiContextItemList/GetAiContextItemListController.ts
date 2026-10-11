import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetListReqBodyDTO} from '@copor/core/client/Core/dto/GetListReqBodyDTO';
import {GetAiContextItemViewModel} from '../GetAiContextItem/GetAiContextItemViewModel';
import {GetAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/interactor/dto/GetAiContextItemDTO';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetAiContextItemListPresenter} from '@copor/ai_context_item/client/AiContextItem/GetAiContextItemList/GetAiContextItemListPresenter';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateGetAiContextItemList} from '@copor/ai_context_item/domain/AiContextItem/validations/ValidateGetAiContextItemList';
import {
	GetAiContextItemListInteractorRepoPicker
} from '@copor/ai_context_item/client/AiContextItem/GetAiContextItemList/repoPicker/GetAiContextItemListInteractorRepoPicker';
import {GetAiContextItemList} from '@copor/ai_context_item/domain/AiContextItem/interactor/GetAiContextItemList';
import {
	GetAiContextItemListLoggerRepoPicker
} from '@copor/ai_context_item/client/AiContextItem/GetAiContextItemList/repoPicker/GetAiContextItemListLoggerRepoPicker';
import {LogGetAiContextItemList} from '@copor/ai_context_item/domain/AiContextItem/logger/LogGetAiContextItemList';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';

export class GetAiContextItemListController
	extends BaseController<GetListReqBodyDTO, GetAiContextItemViewModel[]> {
	async getResponse() {
		const container = this.container;
		const factory = container.getFactory(
            RunFactory<GetAiContextItemDTO[]>,
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
			GetAiContextItemListPresenter,
			response
		);
		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}

	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(
			PermissionValidatorRepoPicker
		);
		const validatorInput = this.actorId;

		return container.getValidator(
			ValidateGetAiContextItemList,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}

	private getInteractor() {
		const container = this.container;
		const interactorRepo = container.getNewRepoPicker(
			GetAiContextItemListInteractorRepoPicker
		);
		const interactorInput = {
			filters: this.request.body.filterList,
			limit: this.request.body.limit,
			offset: this.request.body.offset,
			actorId: this.actorId
		};

		return container.getInteractor(
			GetAiContextItemList,
			interactorRepo,
			interactorInput
		);
	}

	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(
			GetAiContextItemListLoggerRepoPicker
		);

		return container.getLogger(
			LogGetAiContextItemList,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			undefined
		);
	}
}