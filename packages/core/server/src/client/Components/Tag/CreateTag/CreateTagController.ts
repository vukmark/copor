import {CreateTagReqBodyDTO} from './dto/CreateTagReqBodyDTO';
import {CreateTagInteractorRepoPicker} from './repo/repoPicker/CreateTagInteractorRepoPicker';
import {CreateTagLoggerRepoPicker} from './repo/repoPicker/CreateTagLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {ValidateCreateTagDTO} from '@copor/core/domain/Components/Tag/validation/dto/ValidateCreateTagDTO';
import {ValidateCreatePublicTag} from '@copor/core/domain/Components/Tag/validation/ValidateCreatePublicTag';
import {SaveTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/SaveTagDTO';
import {CreateTag} from '@copor/core/domain/Components/Tag/interactor/CreateTag';
import {LogCreateTag, LogDataForCreateTag} from '@copor/core/domain/Components/Tag/logger/LogCreateTag';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateCreatePrivateTag} from '@copor/core/domain/Components/Tag/validation/ValidateCreatePrivateTag';
import {CreateBaseController} from '@copor/core/client/Core/Controller/CreateBaseController';

export class CreateTagController extends CreateBaseController<CreateTagReqBodyDTO> {
	async getResponse() {
		if (this.request.body.isPrivate == undefined)
			this.request.body.isPrivate = false;
		await super.getResponse();
	}

	protected getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);

		const validatorInput: ValidateCreateTagDTO = {
			... this.request.body,
			actorId: this.actorId
		};
		const validator: typeof ValidateCreatePublicTag | typeof ValidateCreatePrivateTag
			= this.request.body.isPrivate ? ValidateCreatePrivateTag : ValidateCreatePublicTag;

		return container.getValidator(
			validator,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}

	protected getInteractor(uniqueId: string) : UseCase<string> {
		const container = this.container;
		const interactorInput: SaveTagDTO = {
			... this.request.body,
			actorId: this.actorId,
			color: this.request.body.color,
			id: uniqueId
		};
		const interactorRepo = container.getNewRepoPicker(CreateTagInteractorRepoPicker);

		return container.getInteractor(
			CreateTag,
			interactorRepo,
			interactorInput
		);
	}

	protected getLogger(uniqueId: string) : LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(CreateTagLoggerRepoPicker);
		const logData = this.getLogData(uniqueId);

		return container.getLogger(
			LogCreateTag,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getLogData(uniqueId: string): LogDataForCreateTag {
		return {
			... this.request.body,
			id: uniqueId
		};
	}
}
