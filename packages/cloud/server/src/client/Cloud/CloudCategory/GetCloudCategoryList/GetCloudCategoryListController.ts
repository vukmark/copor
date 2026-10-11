import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetCloudCategoryViewModel} from '../GetCloudCategory/GetCloudCategoryViewModel';
import {GetCloudCategoryListInteractorRepoPicker} from './repo/repoPicker/GetCloudCategoryListInteractorRepoPicker';
import {GetCloudCategoryListLoggerRepoPicker} from './repo/repoPicker/GetCloudCategoryListLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetCloudCategoryDTO} from '@copor/cloud/domain/Cloud/CloudCategory/interactor/dto/GetCloudCategoryDTO';
import {ValidateGetCloudCategoryList} from '@copor/cloud/domain/Cloud/CloudCategory/validations/ValidateGetCloudCategoryList';
import {GetCloudCategoryList} from '@copor/cloud/domain/Cloud/CloudCategory/interactor/GetCloudCategoryList';
import {LogGetCloudCategoryList} from '@copor/cloud/domain/Cloud/CloudCategory/logger/LogGetCloudCategoryList';

export class GetCloudCategoryListController extends BaseController<void, GetCloudCategoryViewModel[]> {
	async getResponse() {
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<GetCloudCategoryDTO[]>,
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
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput = this.actorId;

		return container.getValidator(
			ValidateGetCloudCategoryList,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}
	private getInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetCloudCategoryListInteractorRepoPicker);

		return container.getInteractor(GetCloudCategoryList, interactorRepo, {filters: []});
	}
	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetCloudCategoryListLoggerRepoPicker);

		return container.getLogger(LogGetCloudCategoryList, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
