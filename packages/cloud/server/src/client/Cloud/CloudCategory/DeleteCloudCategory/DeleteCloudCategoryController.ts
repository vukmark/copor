import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	DeleteCloudCategoryValidatorStorageRepoPicker
} from '@copor/cloud/client/Cloud/CloudCategory/DeleteCloudCategory/repo/repoPicker/DeleteCloudCategoryValidatorStorageRepoPicker';

import {
	DeleteCloudCategoryInteractorRepoPicker
} from '@copor/cloud/client/Cloud/CloudCategory/DeleteCloudCategory/repo/repoPicker/DeleteCloudCategoryInteractorRepoPicker';
import {
	DeleteCloudCategoryLoggerRepoPicker
} from '@copor/cloud/client/Cloud/CloudCategory/DeleteCloudCategory/repo/repoPicker/DeleteCloudCategoryLoggerRepoPicker';
import {
	ValidateDeleteCloudCategoryDTO
} from '@copor/cloud/domain/Cloud/CloudCategory/validations/dto/ValidateDeleteCloudCategoryDTO';
import {ValidateDeleteCloudCategory} from '@copor/cloud/domain/Cloud/CloudCategory/validations/ValidateDeleteCloudCategory';
import {DeleteCloudCategory} from '@copor/cloud/domain/Cloud/CloudCategory/interactor/DeleteCloudCategory';
import {LogDeleteCloudCategory} from '@copor/cloud/domain/Cloud/CloudCategory/logger/LogDeleteCloudCategory';
import {DeleteBaseController} from '@copor/core/client/Core/Controller/DeleteBaseController';

export interface DeleteCloudCategoryParams {
	id: string;
}

export class DeleteCloudCategoryController extends DeleteBaseController<DeleteCloudCategoryParams> {
	protected getValidator(id: string) : Validator {
		const container = this.container;
		const input: ValidateDeleteCloudCategoryDTO = {
			cloudCategoryId: id,
			actorId: this.actorId
		};

		return container.getValidator(
			ValidateDeleteCloudCategory,
			input,
			container.getNewRepoPicker(PermissionValidatorRepoPicker),
			container.getNewRepoPicker(DeleteCloudCategoryValidatorStorageRepoPicker)
		);
	}

	protected getInteractor(id: string) : UseCase<void> {
		const container = this.container;
		const repo = container.getNewRepoPicker(DeleteCloudCategoryInteractorRepoPicker);

		return container.getInteractor(DeleteCloudCategory, repo, id);
	}

	protected getLogger(id: string) : LogAction {
		return this.container.getLogger(
			LogDeleteCloudCategory,
			this.container.getNewRepoPicker(DeleteCloudCategoryLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			{cloudCategoryId: id}
		);
	}
}
