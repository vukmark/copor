import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';
import {UpdateNewsReqBodyDTO} from '@copor/news/client/News/UpdateNews/dto/UpdateNewsReqBodyDTO';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	UpdateNewsValidatorStorageRepoPicker
} from '@copor/news/client/News/UpdateNews/repo/repoPicker/UpdateNewsValidatorStorageRepoPicker';
import {ValidateUpdateNews} from '@copor/news/domain/News/validations/ValidateUpdateNews';
import {SaveNewsDTO} from '@copor/news/domain/News/interactor/dto/SaveNewsDTO';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {UpdateNews} from '@copor/news/domain/News/interactor/UpdateNews';
import {UpdateNewsInteractorRepoPicker} from '@copor/news/client/News/UpdateNews/repo/repoPicker/UpdateNewsInteractorRepoPicker';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {UpdateNewsLoggerRepoPicker} from '@copor/news/client/News/UpdateNews/repo/repoPicker/UpdateNewsLoggerRepoPicker';
import {LogDataForUpdateNews, LogUpdateNews} from '@copor/news/domain/News/logger/LogUpdateNews';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';

export class UpdateNewsController extends UpdateBaseController<UpdateNewsReqBodyDTO> {
	protected getValidator(): Validator {
		const validatorPermissionRepo = this.container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = this.container.getNewRepoPicker(
			UpdateNewsValidatorStorageRepoPicker
		);

		return this.container.getValidator(
			ValidateUpdateNews,
			this.getValidatorInput(),
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor(): UseCase<void> {
		return this.container.getInteractor(
			UpdateNews,
			this.container.getNewRepoPicker(UpdateNewsInteractorRepoPicker),
			this.getValidatorInput()
		);
	}

	protected getLogger(): LogAction {
		const loggerRepo = this.container.getNewRepoPicker(UpdateNewsLoggerRepoPicker);
		const logData: LogDataForUpdateNews = this.getValidatorInput();

		return this.container.getLogger(
			LogUpdateNews,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getValidatorInput(): SaveNewsDTO {
		return {
			... this.request.body,
			actorId: this.actorId
		};
	}
}