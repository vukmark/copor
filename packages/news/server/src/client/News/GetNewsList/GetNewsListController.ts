import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetNewsViewModel} from '@copor/news/client/News/GetNews/GetNewsViewModel';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {GetNewsDTO} from '@copor/news/domain/News/interactor/dto/GetNewsDTO';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateGetNewsList} from '@copor/news/domain/News/validations/ValidateGetNewsList';
import {
	GetNewsListInteractorRepoPicker
} from '@copor/news/client/News/GetNewsList/repo/repoPicker/GetNewsListInteractorRepoPicker';
import {GetNewsList} from '@copor/news/domain/News/interactor/GetNewsList';
import {GetNewsListLoggerRepoPicker} from '@copor/news/client/News/GetNewsList/repo/repoPicker/GetNewsListLoggerRepoPicker';
import {LogGetNewsList} from '@copor/news/domain/News/logger/LogGetNewsList';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetNewsListPresenter} from '@copor/news/client/News/GetNewsList/GetNewsListPresenter';
import {GetListReqBodyDTO} from '@copor/core/client/Core/dto/GetListReqBodyDTO';

export class GetNewsListController
	extends BaseController<GetListReqBodyDTO, GetNewsViewModel[]> {
	async getResponse() {
		const container = this.container;
		const factory = container.getFactory(
            RunFactory<GetNewsDTO[]>,
            this.getValidator(),
            this.getInteractor(),
            this.getLogger()
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		const presenter = this.container.getPresenter(GetNewsListPresenter, response);
		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}

	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput = this.actorId;

		return container.getValidator(
			ValidateGetNewsList,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}

	private getInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetNewsListInteractorRepoPicker);
		const interactorInput = {
			filters: this.request.body.filterList,
			limit: this.request.body.limit,
			offset: this.request.body.offset,
			actorId: this.actorId
		};

		return container.getInteractor(GetNewsList, interactorRepo, interactorInput);
	}

	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetNewsListLoggerRepoPicker);

		return container.getLogger(LogGetNewsList, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}