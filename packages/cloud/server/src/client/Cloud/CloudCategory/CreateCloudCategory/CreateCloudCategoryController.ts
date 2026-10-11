import {CreateCloudCategoryReqBodyDTO}
	from '@copor/cloud/client/Cloud/CloudCategory/CreateCloudCategory/dto/CreateCloudCategoryReqBodyDTO';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {CreateCloudCategoryInteractorRepoPicker}
	from '@copor/cloud/client/Cloud/CloudCategory/CreateCloudCategory/repo/repoPicker/CreateCloudCategoryInteractorRepoPicker';
import {CreateCloudCategoryLoggerRepoPicker}
	from '@copor/cloud/client/Cloud/CloudCategory/CreateCloudCategory/repo/repoPicker/CreateCloudCategoryLoggerRepoPicker';
import {ValidateCreateCloudCategoryDTO}
	from '@copor/cloud/domain/Cloud/CloudCategory/validations/dto/ValidateCreateCloudCategoryDTO';
import {ValidateCreateCloudCategory} from '@copor/cloud/domain/Cloud/CloudCategory/validations/ValidateCreateCloudCategory';
import {SaveCloudCategoryDTO} from '@copor/cloud/domain/Cloud/CloudCategory/interactor/dto/SaveCloudCategoryDTO';
import CreateCloudCategory from '@copor/cloud/domain/Cloud/CloudCategory/interactor/CreateCloudCategory';
import {LogCreateCloudCategory, LogDataForCreateCloudCategory}
	from '@copor/cloud/domain/Cloud/CloudCategory/logger/LogCreateCloudCategory';
import {CreateBaseController} from '@copor/core/client/Core/Controller/CreateBaseController';

export class CreateCloudCategoryController extends CreateBaseController<CreateCloudCategoryReqBodyDTO> {
	protected getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput: ValidateCreateCloudCategoryDTO = {
			... this.request.body,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateCreateCloudCategory,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}

	protected getInteractor(uniqueId: string) : UseCase<string> {
		const container = this.container;
		const interactorInput: SaveCloudCategoryDTO = {
			... this.request.body,
			actorId: this.actorId,
			id: uniqueId
		};
		const interactorRepo = container.getNewRepoPicker(CreateCloudCategoryInteractorRepoPicker);

		return container.getInteractor(
			CreateCloudCategory,
			interactorRepo,
			interactorInput
		);
	}

	protected getLogger(uniqueId: string) : LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(CreateCloudCategoryLoggerRepoPicker);
		const logData = this.getLogData(uniqueId);

		return container.getLogger(
			LogCreateCloudCategory,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getLogData(uniqueId: string): LogDataForCreateCloudCategory {
		return {
			... this.request.body,
			actorId: this.actorId
		};
	}
}
