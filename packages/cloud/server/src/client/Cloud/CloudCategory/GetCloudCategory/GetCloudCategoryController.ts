import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {GetCloudCategoryViewModel} from './GetCloudCategoryViewModel';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetCloudCategoryValidatorStorageRepoPicker} from './repo/repoPicker/GetCloudCategoryValidatorStorageRepoPicker';
import {GetCloudCategoryInteractorRepoPicker} from './repo/repoPicker/GetCloudCategoryInteractorRepoPicker';
import {GetCloudCategoryLoggerRepoPicker} from './repo/repoPicker/GetCloudCategoryLoggerRepoPicker';
import {GetCloudCategoryPresenter} from './GetCloudCategoryPresenter';
import {GetCloudCategoryDTO} from '@copor/cloud/domain/Cloud/CloudCategory/interactor/dto/GetCloudCategoryDTO';
import {
	ValidateCloudCategoryInputDTO
} from '@copor/cloud/domain/Cloud/CloudCategory/validations/dto/ValidateCloudCategoryInputDTO';
import {ValidateGetCloudCategory} from '@copor/cloud/domain/Cloud/CloudCategory/validations/ValidateGetCloudCategory';
import {LogGetCloudCategory} from '@copor/cloud/domain/Cloud/CloudCategory/logger/LogGetCloudCategory';
import {GetCloudCategory} from '@copor/cloud/domain/Cloud/CloudCategory/interactor/GetCloudCategory';
import {SingleItemBaseController} from '@copor/core/client/Core/Controller/SingleItemBaseController';
import {Presenter} from '@copor/core/client/Interface/Presenter';

export class GetCloudCategoryController extends SingleItemBaseController<GetCloudCategoryDTO, GetCloudCategoryViewModel> {
	protected getPresenter(response: GetCloudCategoryDTO): Presenter<GetCloudCategoryViewModel> {
		return this.container.getPresenter(GetCloudCategoryPresenter, response);
	}
	protected getValidator(id: string) {
		const c = this.container;
		const validatorInput: ValidateCloudCategoryInputDTO = {
			cloudCategoryId: id,
			actorId: this.actorId
		};

		return c.getValidator(
			ValidateGetCloudCategory,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetCloudCategoryValidatorStorageRepoPicker)
		);
	}

	protected getLogger(id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetCloudCategoryLoggerRepoPicker);
		const logData = {
			cloudCategoryId: id
		};

		return this.container.getLogger(
			LogGetCloudCategory,
			loggerRepository,
			new CreateLogDetails(this.actorId),
			logData
		);
	}

	protected getInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetCloudCategoryInteractorRepoPicker);

		return this.container.getInteractor(
			GetCloudCategory,
			interactorRepository,
			id
		);
	}
}
