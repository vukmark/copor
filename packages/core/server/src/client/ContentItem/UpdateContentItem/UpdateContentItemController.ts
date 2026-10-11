import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';
import {UpdateContentItemReqBodyDTO} from '@copor/core/client/ContentItem/UpdateContentItem/dto/UpdateContentItemReqBodyDTO';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateUpdateContentItem} from '@copor/core/domain/ContentItem/validations/ValidateUpdateContentItem';
import {SaveContentItemDTO} from '@copor/core/domain/ContentItem/interactor/dto/SaveContentItemDTO';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {UpdateContentItem} from '@copor/core/domain/ContentItem/interactor/UpdateContentItem';
import {UpdateContentItemInteractorRepoPicker}
	from '@copor/core/client/ContentItem/UpdateContentItem/repo/repoPicker/UpdateContentItemInteractorRepoPicker';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {UpdateContentItemLoggerRepoPicker} from '@copor/core/client/ContentItem/UpdateContentItem/repo/repoPicker/UpdateContentItemLoggerRepoPicker';
import {LogDataForUpdateContentItem, LogUpdateContentItem} from '@copor/core/domain/ContentItem/logger/LogUpdateContentItem';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {
	UpdateContentItemValidatorStorageRepoPicker
} from '@copor/core/client/ContentItem/UpdateContentItem/repo/repoPicker/UpdateContentItemValidatorStorageRepoPicker';

export class UpdateContentItemController extends UpdateBaseController<UpdateContentItemReqBodyDTO> {
	protected getValidator(): Validator {
		const validatorPermissionRepo = this.container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = this.container.getNewRepoPicker(UpdateContentItemValidatorStorageRepoPicker);

		return this.container.getValidator(
			ValidateUpdateContentItem,
			this.getValidatorInput(),
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor(): UseCase<void> {
		return this.container.getInteractor(
			UpdateContentItem,
			this.container.getNewRepoPicker(UpdateContentItemInteractorRepoPicker),
			this.getValidatorInput()
		);
	}

	protected getLogger(): LogAction {
		const loggerRepo = this.container.getNewRepoPicker(UpdateContentItemLoggerRepoPicker);
		const logData: LogDataForUpdateContentItem = this.getValidatorInput();

		return this.container.getLogger(
			LogUpdateContentItem,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getValidatorInput(): SaveContentItemDTO {
		return {
			... this.request.body,
			actorId: this.actorId
		};
	}
}