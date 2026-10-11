import {SingleItemBaseController} from '@copor/core/client/Core/Controller/SingleItemBaseController';
import {GetNewsDTO} from '@copor/news/domain/News/interactor/dto/GetNewsDTO';
import {GetNewsViewModel} from '@copor/news/client/News/GetNews/GetNewsViewModel';
import {Presenter} from '@copor/core/client/Interface/Presenter';
import {GetNewsPresenter} from '@copor/news/client/News/GetNews/GetNewsPresenter';
import {ValidateGetNewsDTO} from '@copor/news/domain/News/validations/dto/ValidateGetNewsDTO';
import {ValidateGetNews} from '@copor/news/domain/News/validations/ValidateGetNews';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	GetNewsValidatorStorageRepoPicker
} from '@copor/news/client/News/GetNews/repo/repoPicker/GetNewsValidatorStorageRepoPicker';
import {GetNewsLoggerRepoPicker} from '@copor/news/client/News/GetNews/repo/repoPicker/GetNewsLoggerRepoPicker';
import {LogGetNews} from '@copor/news/domain/News/logger/LogGetNews';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {GetNewsInteractorRepoPicker} from '@copor/news/client/News/GetNews/repo/repoPicker/GetNewsInteractorRepoPicker';
import {GetNews} from '@copor/news/domain/News/interactor/GetNews';

export class GetNewsController extends SingleItemBaseController<GetNewsDTO, GetNewsViewModel> {
	protected getPresenter(response: GetNewsDTO): Presenter<GetNewsViewModel> {
		return this.container.getPresenter(GetNewsPresenter, response);
	}

	protected getValidator(id: string) {
		const c = this.container;
		const validatorInput: ValidateGetNewsDTO = {
			actorId: this.actorId,
			newsId: id
		};

		return c.getValidator(
			ValidateGetNews,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetNewsValidatorStorageRepoPicker)
		);
	}

	protected getLogger(id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetNewsLoggerRepoPicker);
		const logData = {newsId: id};

		return this.container.getLogger(
			LogGetNews,
			loggerRepository,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	protected getInteractor(id: string): UseCase<GetNewsDTO> {
		const interactorRepository = this.container.getNewRepoPicker(GetNewsInteractorRepoPicker);

		return this.container.getInteractor(
			GetNews,
			interactorRepository,
			id
		);
	}
}
