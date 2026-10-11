import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetFileListInteractorRepoPicker} from './repo/repoPicker/GetFileListInteractorRepoPicker';
import {GetFileListLoggerRepoPicker} from './repo/repoPicker/GetFileListLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateGetFileListForUser} from '@copor/cloud/domain/Cloud/validation/ValidateGetFileListForUser';
import {GetFileListForUser} from '@copor/cloud/domain/Cloud/interactor/GetFileListForUser';
import {LogGetFileListForUser} from '@copor/cloud/domain/Cloud/logger/LogGetFileListForUser';
import {GetFileListPresenter} from '@copor/cloud/client/Cloud/GetFileList/GetFileListPresenter';
import {GetFolderViewModel} from '@copor/cloud/client/Cloud/GetFileList/GetFolderViewModel';
import {CloudNode} from '@copor/cloud/domain/Cloud/interactor/dto/CloudNode';


export class GetFileListController extends BaseController<void, GetFolderViewModel[]> {
	async getResponse() {
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<CloudNode[]>,
			this.getValidator(),
			this.getInteractor(),
			this.getLogger()
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = this.container.getPresenter(GetFileListPresenter, response);

		this.response.status(200);
		this.response.send(presenter.present());
	}
	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput = this.actorId;

		return container.getValidator(
			ValidateGetFileListForUser,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}
	private getInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetFileListInteractorRepoPicker);

		return container.getInteractor(GetFileListForUser, interactorRepo, this.actorId);
	}
	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetFileListLoggerRepoPicker);

		return container.getLogger(LogGetFileListForUser, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
