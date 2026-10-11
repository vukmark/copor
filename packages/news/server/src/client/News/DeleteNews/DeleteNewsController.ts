import {DeleteBaseController} from '@copor/core/client/Core/Controller/DeleteBaseController';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateDeleteNewsDTO} from '@copor/news/domain/News/validations/dto/ValidateDeleteNewsDTO';
import {ValidateDeleteNews} from '@copor/news/domain/News/validations/ValidateDeleteNews';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	DeleteNewsValidatorStorageRepoPicker
} from '@copor/news/client/News/DeleteNews/repo/repoPicker/DeleteNewsValidatorStorageRepoPicker';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {DeleteNewsInteractorRepoPicker} from '@copor/news/client/News/DeleteNews/repo/repoPicker/DeleteNewsInteractorRepoPicker';
import {DeleteNews} from '@copor/news/domain/News/interactor/DeleteNews';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {LogDeleteNews} from '@copor/news/domain/News/logger/LogDeleteNews';
import {DeleteNewsLoggerRepoPicker} from '@copor/news/client/News/DeleteNews/repo/repoPicker/DeleteNewsLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';

export interface DeleteNewsParams {
	id: string;
}

export class DeleteNewsController extends DeleteBaseController<DeleteNewsParams> {
	protected getValidator(id: string): Validator {
		const container = this.container;
		const input: ValidateDeleteNewsDTO = {
			newsId: id,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateDeleteNews,
			input,
			container.getNewRepoPicker(PermissionValidatorRepoPicker),
			container.getNewRepoPicker(DeleteNewsValidatorStorageRepoPicker)
		);
	}

	protected getInteractor(id: string): UseCase<void> {
		const container = this.container;
		const repo = container.getNewRepoPicker(DeleteNewsInteractorRepoPicker);

		return container.getInteractor(DeleteNews, repo, id);
	}

	protected getLogger(id: string): LogAction {
		return this.container.getLogger(
			LogDeleteNews,
			this.container.getNewRepoPicker(DeleteNewsLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{newsId: id}
		);
	}
}