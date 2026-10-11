import {CreateBaseController} from '@copor/core/client/Core/Controller/CreateBaseController';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {ValidateCreateContentItemDTO} from '@copor/core/domain/ContentItem/validations/dto/ValidateCreateContentItemDTO';
import {ValidateCreateContentItem} from '@copor/core/domain/ContentItem/validations/ValidateCreateContentItem';
import {SaveContentItemDTO} from '@copor/core/domain/ContentItem/interactor/dto/SaveContentItemDTO';

import {CreateContentItem} from '@copor/core/domain/ContentItem/interactor/CreateContentItem';
import {LogCreateContentItem, LogDataForCreateContentItem} from '@copor/core/domain/ContentItem/logger/LogCreateContentItem';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {CreateContentItemReqBodyDTO} from '@copor/core/client/ContentItem/CreateContentItem/dto/CreateContentItemReqBodyDTO';
import {
	CreateContentItemValidatorPermissionRepoPicker
} from '@copor/core/client/ContentItem/CreateContentItem/repo/repoPicker/CreateContentItemValidatorPermissionRepoPicker';
import {
	CreateContentItemValidatorStorageRepoPicker
} from '@copor/core/client/ContentItem/CreateContentItem/repo/repoPicker/CreateContentItemValidatorStorageRepoPicker';
import {
	CreateContentItemInteractorRepoPicker
} from '@copor/core/client/ContentItem/CreateContentItem/repo/repoPicker/CreateContentItemInteractorRepoPicker';
import {
	CreateContentItemLoggerRepoPicker
} from '@copor/core/client/ContentItem/CreateContentItem/repo/repoPicker/CreateContentItemLoggerRepoPicker';

export class CreateContentItemController extends CreateBaseController<CreateContentItemReqBodyDTO> {
	protected getValidator(): Validator {
		const container = this.container;

		const validatorPermissionRepo
            = container.getNewRepoPicker(CreateContentItemValidatorPermissionRepoPicker);
		const validatorStorageRepo
        = container.getNewRepoPicker(CreateContentItemValidatorStorageRepoPicker);

		const validatorInput: ValidateCreateContentItemDTO = {
			title: this.request.body.title,
			summary: this.request.body.summary,
			content: this.request.body.content,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateCreateContentItem,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor(uniqueId: string): UseCase<string> {
		const container = this.container;

		const interactorInput: SaveContentItemDTO = {
			... this.request.body,
			roleId: this.request.body.roleId ?? [],
			actorId: this.actorId,
			id: uniqueId
		};

		const interactorRepo
			= container.getNewRepoPicker(CreateContentItemInteractorRepoPicker);

		return container.getInteractor(
			CreateContentItem,
			interactorRepo,
			interactorInput
		);
	}

	protected getLogger(uniqueId: string): LogAction {
		const container = this.container;

		const loggerRepo
        = container.getNewRepoPicker(CreateContentItemLoggerRepoPicker);
		const logData = this.getLogData(uniqueId);

		return container.getLogger(
			LogCreateContentItem,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	protected getLogData(uniqueId: string): LogDataForCreateContentItem {
		return {
			... this.request.body,
			id: uniqueId
		};
	}
}