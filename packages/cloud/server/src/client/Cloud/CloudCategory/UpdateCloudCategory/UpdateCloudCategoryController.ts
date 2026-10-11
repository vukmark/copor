import {UpdateCloudCategoryReqBodyDTO} from './dto/UpdateCloudCategoryReqBodyDTO';
import {
	UpdateCloudCategoryValidatorStorageRepoPicker
} from './repo/repoPicker/UpdateCloudCategoryValidatorStorageRepoPicker';
import {UpdateCloudCategoryInteractorRepoPicker} from './repo/repoPicker/UpdateCloudCategoryInteractorRepoPicker';
import {UpdateCloudCategoryLoggerRepoPicker} from './repo/repoPicker/UpdateCloudCategoryLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateUpdateCloudCategory} from '@copor/cloud/domain/Cloud/CloudCategory/validations/ValidateUpdateCloudCategory';
import {UpdateCloudCategory} from '@copor/cloud/domain/Cloud/CloudCategory/interactor/UpdateCloudCategory';
import {
	LogDataForUpdateCloudCategory,
	LogUpdateCloudCategory
} from '@copor/cloud/domain/Cloud/CloudCategory/logger/LogUpdateCloudCategory';
import {SaveCloudCategoryDTO} from '@copor/cloud/domain/Cloud/CloudCategory/interactor/dto/SaveCloudCategoryDTO';
import {UpdateBaseController} from '@copor/core/client/Core/Controller/UpdateBaseController';

export class UpdateCloudCategoryController extends UpdateBaseController<UpdateCloudCategoryReqBodyDTO> {

	protected getValidator(): Validator {
		const validatorPermissionRepo = this.container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = this.container.getNewRepoPicker(
			UpdateCloudCategoryValidatorStorageRepoPicker
		);

		return this.container.getValidator(
			ValidateUpdateCloudCategory,
			this.getValidatorInput(),
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	protected getInteractor() {
		return this.container.getInteractor(
			UpdateCloudCategory,
			this.container.getNewRepoPicker(UpdateCloudCategoryInteractorRepoPicker),
			this.getValidatorInput()
		);
	}

	protected getLogger() {
		const loggerRepo = this.container.getNewRepoPicker(UpdateCloudCategoryLoggerRepoPicker);
		const logData: LogDataForUpdateCloudCategory = {
			... this.request.body,
			actorId: this.actorId
		};

		return this.container.getLogger(
			LogUpdateCloudCategory,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	private getValidatorInput(): SaveCloudCategoryDTO {
		return {
			... this.request.body,
			actorId: this.actorId
		};
	}
}
