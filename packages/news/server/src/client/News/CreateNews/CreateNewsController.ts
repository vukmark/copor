import {CreateBaseController} from '@copor/core/client/Core/Controller/CreateBaseController';
import {CreateNewsReqBodyDTO} from '@copor/news/client/News/CreateNews/dto/CreateNewsReqBodyDTO';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {
	CreateNewsValidatorStorageRepoPicker
} from '@copor/news/client/News/CreateNews/repo/repoPicker/CreateNewsValidatorStorageRepoPicker';
import {ValidateCreateNewsDTO} from '@copor/news/domain/News/validations/dto/ValidateCreateNewsDTO';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {SaveNewsDTO} from '@copor/news/domain/News/interactor/dto/SaveNewsDTO';
import {CreateNewsInteractorRepoPicker} from '@copor/news/client/News/CreateNews/repo/repoPicker/CreateNewsInteractorRepoPicker';
import {CreateNews} from '@copor/news/domain/News/interactor/CreateNews';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {LogCreateNews, LogDataForCreateNews} from '@copor/news/domain/News/logger/LogCreateNews';
import {CreateNewsLoggerRepoPicker} from '@copor/news/client/News/CreateNews/repo/repoPicker/CreateNewsLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {ValidateCreateNews} from '@copor/news/domain/News/validations/ValidateCreateNews';
import {
	CreateNewsValidatorPermissionRepoPicker
} from '@copor/news/client/News/CreateNews/repo/repoPicker/CreateNewsValidatorPermissionRepoPicker';

export class CreateNewsController extends CreateBaseController<CreateNewsReqBodyDTO> {
	protected getValidator(): Validator {
		const container = this.container;

		const validatorPermissionRepo = container.getNewRepoPicker(CreateNewsValidatorPermissionRepoPicker);
		const validatorStorageRepo = container.getNewRepoPicker(CreateNewsValidatorStorageRepoPicker);

		const validatorInput: ValidateCreateNewsDTO = {
			... this.request.body,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateCreateNews,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor(uniqueId: string): UseCase<string> {
		const container = this.container;

		const interactorInput: SaveNewsDTO = {
			... this.request.body,
			actorId: this.actorId,
			id: uniqueId
		};

		const interactorRepo = container.getNewRepoPicker(CreateNewsInteractorRepoPicker);

		return container.getInteractor(
			CreateNews,
			interactorRepo,
			interactorInput
		);
	}

	protected getLogger(uniqueId: string): LogAction {
		const container = this.container;

		const loggerRepo = container.getNewRepoPicker(CreateNewsLoggerRepoPicker);
		const logData = this.getLogData(uniqueId);

		return container.getLogger(
			LogCreateNews,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	protected getLogData(uniqueId: string): LogDataForCreateNews {
		return {
			... this.request.body,
			id: uniqueId
		};
	}
}