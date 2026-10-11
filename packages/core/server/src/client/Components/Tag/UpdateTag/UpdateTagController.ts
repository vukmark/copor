import {BaseController} from '@copor/core/client/Core/BaseController';
import {UpdateTagReqBodyDTO} from './dto/UpdateTagReqBodyDTO';
import {UpdateTagValidatorStorageRepoPicker} from './repo/repoPicker/UpdateTagValidatorStorageRepoPicker';
import {UpdateTagInteractorRepoPicker} from './repo/repoPicker/UpdateTagInteractorRepoPicker';
import {UpdateTagLoggerRepoPicker} from './repo/repoPicker/UpdateTagLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateUpdateTag} from '@copor/core/domain/Components/Tag/validation/ValidateUpdateTag';
import {UpdateTag} from '@copor/core/domain/Components/Tag/interactor/UpdateTag';
import {LogDataForUpdateTag, LogUpdateTag} from '@copor/core/domain/Components/Tag/logger/LogUpdateTag';
import {SaveTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/SaveTagDTO';
import {UpdateTagValidatorPermissionRepoPicker}
	from '@copor/core/client/Components/Tag/UpdateTag/repo/repoPicker/UpdateTagValidatorPermissionRepoPicker';

export class UpdateTagController extends BaseController<UpdateTagReqBodyDTO, void> {
	async getResponse() {
		if (this.request.body.isPrivate == undefined)
			this.request.body.isPrivate = false;
		const factory = this.container.getFactory(
			RunFactory,
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
		const validatorPermissionRepo = this.container.getNewRepoPicker(UpdateTagValidatorPermissionRepoPicker);
		const validatorStorageRepo = this.container.getNewRepoPicker(
			UpdateTagValidatorStorageRepoPicker
		);

		return this.container.getValidator(
			ValidateUpdateTag,
			this.getValidatorInput(),
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	private getInteractor() {
		return this.container.getInteractor(
			UpdateTag,
			this.container.getNewRepoPicker(UpdateTagInteractorRepoPicker),
			this.getValidatorInput()
		);
	}

	private getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(UpdateTagLoggerRepoPicker);
		const logData: LogDataForUpdateTag = {
			... this.request.body,
			color: this.request.body.color
		};

		return this.container.getLogger(
			LogUpdateTag,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getValidatorInput(): SaveTagDTO {
		return {
			... this.request.body,
			description: this.request.body.description ?? '',
			color: this.request.body.color,
			actorId: this.actorId
		};
	}
}
