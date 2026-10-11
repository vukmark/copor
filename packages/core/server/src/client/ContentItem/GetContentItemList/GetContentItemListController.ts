import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetListReqBodyDTO} from '@copor/core/client/Core/dto/GetListReqBodyDTO';
import {GetContentItemViewModel} from '../GetContentItem/GetContentItemViewModel';
import {GetContentItemDTO} from '@copor/core/domain/ContentItem/interactor/dto/GetContentItemDTO';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetContentItemListPresenter} from '@copor/core/client/ContentItem/GetContentItemList/GetContentItemListPresenter';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateGetContentItemList} from '@copor/core/domain/ContentItem/validations/ValidateGetContentItemList';
import {
	GetContentItemListInteractorRepoPicker
} from '@copor/core/client/ContentItem/GetContentItemList/repoPicker/GetContentItemListInteractorRepoPicker';
import {GetContentItemList} from '@copor/core/domain/ContentItem/interactor/GetContentItemList';
import {
	GetContentItemListLoggerRepoPicker
} from '@copor/core/client/ContentItem/GetContentItemList/repoPicker/GetContentItemListLoggerRepoPicker';
import {LogGetContentItemList} from '@copor/core/domain/ContentItem/logger/LogGetContentItemList';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';

export class GetContentItemListController
	extends BaseController<GetListReqBodyDTO, GetContentItemViewModel[]> {
	async getResponse() {
		const container = this.container;

		const factory = container.getFactory(
            RunFactory<GetContentItemDTO[]>,
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
			GetContentItemListPresenter,
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
			ValidateGetContentItemList,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}

	private getInteractor() {
		const container = this.container;
		const interactorRepo = container.getNewRepoPicker(
			GetContentItemListInteractorRepoPicker
		);

		const interactorInput = {
			filters: this.request.body.filterList,
			limit: this.request.body.limit,
			offset: this.request.body.offset,
			actorId: this.actorId
		};

		return container.getInteractor(
			GetContentItemList,
			interactorRepo,
			interactorInput
		);
	}

	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(
			GetContentItemListLoggerRepoPicker
		);

		return container.getLogger(
			LogGetContentItemList,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			undefined
		);
	}
}