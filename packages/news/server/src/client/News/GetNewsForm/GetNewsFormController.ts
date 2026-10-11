import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetFormViewModel} from '@copor/core/client/Core/Form/GetFormViewModel';
import {GetNewsDTO} from '@copor/news/domain/News/interactor/dto/GetNewsDTO';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {
	GetNewsListInteractorRepoPicker
} from '@copor/news/client/News/GetNewsList/repo/repoPicker/GetNewsListInteractorRepoPicker';
import {GetNewsList} from '@copor/news/domain/News/interactor/GetNewsList';
import {ValidateGetNewsDTO} from '@copor/news/domain/News/validations/dto/ValidateGetNewsDTO';
import {ValidateGetNews} from '@copor/news/domain/News/validations/ValidateGetNews';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	GetNewsValidatorStorageRepoPicker
} from '@copor/news/client/News/GetNews/repo/repoPicker/GetNewsValidatorStorageRepoPicker';
import {GetNewsLoggerRepoPicker} from '@copor/news/client/News/GetNews/repo/repoPicker/GetNewsLoggerRepoPicker';
import {LogGetNews} from '@copor/news/domain/News/logger/LogGetNews';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {GetNewsInteractorRepoPicker} from '@copor/news/client/News/GetNews/repo/repoPicker/GetNewsInteractorRepoPicker';
import {GetNews} from '@copor/news/domain/News/interactor/GetNews';
import {GetNewsFormPresenter} from '@copor/news/client/News/GetNewsForm/GetNewsFormPresenter';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {
	GetRoleListInteractorRepoPicker
} from '@copor/core/client/Components/Role/GetRoleList/repo/repoPicker/GetRoleListInteractorRepoPicker';
import {GetRoleList} from '@copor/core/domain/Components/Role/interactor/GetRoleList';

export interface GetNewsFormParams {
	id: string;
}

export class GetNewsFormController
	extends BaseController<undefined, GetFormViewModel> {
	async getResponse(): Promise<void> {
		const params = this.request.params as GetNewsFormParams;
		const roleList = await this.getRoleListInteractor().execute();
		const id: string = params.id;
		const actorId = this.actorId;

		if (!params.id) {
			const presenter = this.container.getPresenter(GetNewsFormPresenter, {
				news: this.getDefaultNewsData(),
				roleList
			});

			this.response.status(200);
			this.response.send(presenter.present());

			return;
		}

		const newsFactory = this.container.getFactory(
            RunFactory<GetNewsDTO>,
            this.getNewsValidator(actorId, id),
            this.getNewsInteractor(id),
            this.getNewsLogger(actorId, id)
		);

		const news = await newsFactory.run();

		if (news instanceof ErrorList) {
			this.next(news);
			return;
		}

		const presenter = this.container.getPresenter(GetNewsFormPresenter, {
			news,
			roleList
		});

		this.response.status(200);
		this.response.send(presenter.present());
	}

	private getDefaultNewsData(): GetNewsDTO {
		return {
			id: '',
			title: '',
			content: '',
			summary: '',
			publishDate: new Date('2001-01-01'),
			role: [
				{
					id: '',
					type: RoleType.USER,
					name: ''
				}
			],
			publishStatus: PublishStatus.unpublished
		};
	}

	private getRoleListInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetRoleListInteractorRepoPicker);

		return container.getInteractor(GetRoleList, interactorRepo, {filters: []});
	}

	private getNewsListInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetNewsListInteractorRepoPicker);

		return container.getInteractor(GetNewsList, interactorRepo, {filters: []});
	}

	private getNewsValidator(actorId: string, id: string) {
		const c = this.container;
		const validatorInput: ValidateGetNewsDTO = {actorId, newsId: id};

		return c.getValidator(
			ValidateGetNews,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetNewsValidatorStorageRepoPicker)
		);
	}

	private getNewsLogger(actorId: string, id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetNewsLoggerRepoPicker);
		const logData = {
			newsId: id
		};

		return this.container.getLogger(
			LogGetNews,
			loggerRepository,
			new CreateLogDetails(actorId),
			logData
		);
	}

	private getNewsInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetNewsInteractorRepoPicker);

		return this.container.getInteractor(
			GetNews,
			interactorRepository,
			id
		);
	}
}